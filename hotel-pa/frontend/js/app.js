const $ = (id) => document.getElementById(id);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const baseUrl = () => localStorage.getItem("backend_url") || "http://localhost:3000";
const toast = $("toast");
let charts = { ocupacion: null, ingresos: null };
let cache = { habitaciones: [], reservas: [], estadias: [], facturas: [], huespedes: [] };

function notify(msg, err = false) {
  toast.textContent = msg;
  toast.style.display = "block";
  toast.style.borderColor = err ? "#dc2626" : "#16a34a";
  setTimeout(() => (toast.style.display = "none"), 1800);
}

async function api(path, opts = {}) {
  const r = await fetch(baseUrl() + path, {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.mensaje || "Error API");
  return data;
}

function setView(view) {
  $$(".nav-item").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
  $$(".view").forEach((v) => v.classList.toggle("active", v.dataset.view === view));
}

function bindLayout() {
  $$(".nav-item").forEach((btn) => btn.addEventListener("click", () => setView(btn.dataset.view)));
  $("sidebarToggle").addEventListener("click", () => $("sidebar").classList.toggle("collapsed"));
  $("themeToggle").addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
  document.body.dataset.theme = localStorage.getItem("theme") || "dark";
}

function monthKey(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function renderDashboard() {
  const total = cache.habitaciones.length;
  const ocupadas = cache.habitaciones.filter((h) => String(h.estado).toUpperCase().includes("OCUP")).length;
  const disponibles = Math.max(0, total - ocupadas);
  const activas = cache.reservas.filter((r) => String(r.estado).toUpperCase() !== "CANCELADA").length;
  const hoy = new Date().toISOString().slice(0, 10);
  const ingresoHoy = cache.facturas
    .filter((f) => String(f.fecha || "").slice(0, 10) === hoy)
    .reduce((a, b) => a + Number(b.total || 0), 0);

  $("kpiCards").innerHTML = `
    <div class="kpi"><span>Total habitaciones</span><b>${total}</b></div>
    <div class="kpi"><span>Disponibles / Ocupadas</span><b>${disponibles} / ${ocupadas}</b></div>
    <div class="kpi"><span>Reservas activas</span><b>${activas}</b></div>
    <div class="kpi"><span>Ingresos del día</span><b>S/ ${ingresoHoy.toFixed(2)}</b></div>`;

  const meses = [...new Set([...cache.estadias.map((e) => monthKey(e.fechaCheckIn)), ...cache.facturas.map((f) => monthKey(f.fecha))])].sort();
  const ocupacion = meses.map((m) => cache.estadias.filter((e) => monthKey(e.fechaCheckIn) === m).length);
  const ingresos = meses.map((m) => cache.facturas.filter((f) => monthKey(f.fecha) === m).reduce((a, b) => a + Number(b.total || 0), 0));

  charts.ocupacion?.destroy();
  charts.ingresos?.destroy();
  charts.ocupacion = new Chart($("ocupacionChart"), {
    type: "bar",
    data: { labels: meses, datasets: [{ label: "Ocupación mensual", data: ocupacion, backgroundColor: "#1d7d6a" }] },
    options: { responsive: true, plugins: { legend: { display: false } } },
  });
  charts.ingresos = new Chart($("ingresosChart"), {
    type: "line",
    data: { labels: meses, datasets: [{ label: "Ingresos por mes", data: ingresos, borderColor: "#c7a14a", tension: .35 }] },
    options: { responsive: true },
  });
}

function renderHabitaciones() {
  const search = $("habitacionSearch").value.toLowerCase();
  const tipo = $("habitacionTipoFiltro").value;
  const estado = $("habitacionEstadoFiltro").value;
  const items = cache.habitaciones.filter((h) => {
    const okSearch = String(h.numero).toLowerCase().includes(search);
    const okTipo = !tipo || String(h.tipoHabitacionId) === tipo;
    const okEstado = !estado || String(h.estado) === estado;
    return okSearch && okTipo && okEstado;
  });
  $("habitacionesTable").innerHTML = items
    .map((h) => `<tr><td>${h.numero}</td><td>${h.tipoHabitacionId}</td><td>${h.estado}</td><td>S/ ${Number(h.precioPorNoche).toFixed(2)}</td></tr>`)
    .join("");

  const tipos = [...new Set(cache.habitaciones.map((h) => String(h.tipoHabitacionId)))];
  const estados = [...new Set(cache.habitaciones.map((h) => String(h.estado)))];
  $("habitacionTipoFiltro").innerHTML = `<option value="">Todos los tipos</option>${tipos.map((t) => `<option ${tipo===t?"selected":""} value="${t}">${t}</option>`).join("")}`;
  $("habitacionEstadoFiltro").innerHTML = `<option value="">Todos los estados</option>${estados.map((e) => `<option ${estado===e?"selected":""} value="${e}">${e}</option>`).join("")}`;
}

function renderHuespedes() {
  const q = $("huespedSearch").value.toLowerCase();
  const items = cache.huespedes.filter((h) => `${h.nombre} ${h.apellido} ${h.dni} ${h.telefono}`.toLowerCase().includes(q));
  $("huespedesList").innerHTML = items
    .map((h) => `<article class="card"><b>${h.nombre} ${h.apellido}</b><div>DNI: ${h.dni}</div><div>Tel: ${h.telefono}</div></article>`)
    .join("");
}

function badgeEstado(estado) {
  const e = String(estado || "").toUpperCase();
  if (e.includes("CONF")) return `<span class="status ok">${estado}</span>`;
  if (e.includes("CANCEL")) return `<span class="status bad">${estado}</span>`;
  return `<span class="status pending">${estado}</span>`;
}

function renderReservas() {
  $("reservasTable").innerHTML = cache.reservas
    .map((r) => `<tr>
      <td>${r.id}</td><td>${r.huespedId}</td><td>${r.habitacionId}</td>
      <td>${new Date(r.fechaInicio).toLocaleDateString()} - ${new Date(r.fechaFin).toLocaleDateString()}</td>
      <td>${badgeEstado(r.estado)}</td>
      <td><button onclick="confirmarReserva(${r.id})">Confirmar</button> <button onclick="cancelarReserva(${r.id})">Cancelar</button></td>
    </tr>`)
    .join("");
}

function renderEstadias() {
  $("estadiasList").innerHTML = cache.estadias
    .map((e) => `<article class="card"><b>Estadía #${e.id}</b><div>Reserva: ${e.reservaId}</div><div>Check-in: ${new Date(e.fechaCheckIn).toLocaleString()}</div><div>Check-out: ${e.fechaCheckOut ? new Date(e.fechaCheckOut).toLocaleString() : "Pendiente"}</div></article>`)
    .join("");
}

function renderPagos() {
  const from = $("pagoDesde").value;
  const to = $("pagoHasta").value;
  let pagos = [...cache.facturas];
  if (from) pagos = pagos.filter((p) => String(p.fecha).slice(0, 10) >= from);
  if (to) pagos = pagos.filter((p) => String(p.fecha).slice(0, 10) <= to);
  $("pagosList").innerHTML = pagos
    .map((p) => `<article class="card"><b>${p.numero || "FACTURA"}</b><div>Fecha: ${new Date(p.fecha).toLocaleDateString()}</div><div>Total: S/ ${Number(p.total || 0).toFixed(2)}</div><div>${Number(p.total || 0) > 0 ? '<span class="status ok">Completado</span>' : '<span class="status pending">Pendiente</span>'}</div></article>`)
    .join("");
}

async function renderReportes() {
  const hist = await api("/habitaciones/historial/precios").catch(() => []);
  $("historialPreciosList").innerHTML = hist.slice(-8).reverse().map((h) => `<div>Hab ${h.habitacionId}: S/${h.precioAnterior} → S/${h.precioNuevo}</div>`).join("") || "Sin historial";
  const ingresosTotal = cache.facturas.reduce((a, b) => a + Number(b.total || 0), 0);
  $("reportesResumen").innerHTML = `<p>Facturas emitidas: <b>${cache.facturas.length}</b></p><p>Ingresos acumulados: <b>S/ ${ingresosTotal.toFixed(2)}</b></p><p>Estadías registradas: <b>${cache.estadias.length}</b></p>`;
}

function bindForms() {
  $("habitacionSearch").addEventListener("input", renderHabitaciones);
  $("habitacionTipoFiltro").addEventListener("change", renderHabitaciones);
  $("habitacionEstadoFiltro").addEventListener("change", renderHabitaciones);
  $("huespedSearch").addEventListener("input", renderHuespedes);
  $("filtrarPagos").addEventListener("click", renderPagos);

  $("openHabitacionModal").addEventListener("click", () => $("habitacionModal").classList.remove("hidden"));
  $("closeHabitacionModal").addEventListener("click", () => $("habitacionModal").classList.add("hidden"));

  $("habitacionForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await api("/habitaciones", { method: "POST", body: JSON.stringify({ numero: String(fd.get("numero")), piso: Number(fd.get("piso")), tipoHabitacionId: Number(fd.get("tipoHabitacionId")), precioPorNoche: Number(fd.get("precioPorNoche")) }) });
    $("habitacionModal").classList.add("hidden");
    await loadAll();
    notify("Habitación registrada");
  });

  const reservaForm = $("reservaForm");
  const val = $("reservaValidation");
  reservaForm.addEventListener("input", () => {
    const fd = new FormData(reservaForm);
    const fi = fd.get("fechaInicio");
    const ff = fd.get("fechaFin");
    if (!fi || !ff) return (val.textContent = "");
    val.textContent = new Date(ff) >= new Date(fi) ? "Fechas válidas" : "Fecha fin no puede ser menor a fecha inicio";
  });
  reservaForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(reservaForm);
    if (new Date(String(fd.get("fechaFin"))) < new Date(String(fd.get("fechaInicio")))) return notify("Rango de fechas inválido", true);
    await api("/reservas", { method: "POST", body: JSON.stringify({ huespedId: Number(fd.get("huespedId")), habitacionId: Number(fd.get("habitacionId")), fechaInicio: String(fd.get("fechaInicio")), fechaFin: String(fd.get("fechaFin")) }) });
    reservaForm.reset();
    await loadAll();
    notify("Reserva creada");
  });

  $("checkinForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = Number(new FormData(e.target).get("reservaId"));
    await api("/estadias/checkin", { method: "POST", body: JSON.stringify({ reservaId: id }) });
    await loadAll();
    notify("Check-in realizado");
  });

  $("checkoutForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = Number(new FormData(e.target).get("estadiaId"));
    await api("/estadias/checkout", { method: "POST", body: JSON.stringify({ estadiaId: id }) });
    await loadAll();
    notify("Check-out realizado");
  });
}

window.confirmarReserva = async (id) => {
  await api(`/reservas/${id}/confirmar`, { method: "PATCH", body: JSON.stringify({}) });
  await loadAll();
};
window.cancelarReserva = async (id) => {
  await api(`/reservas/${id}/cancelar`, { method: "PATCH", body: JSON.stringify({}) });
  await loadAll();
};

async function loadAll() {
  const [habitaciones, reservas, estadias, facturas, huespedes] = await Promise.all([
    api("/habitaciones").catch(() => []),
    api("/reservas").catch(() => []),
    api("/estadias").catch(() => []),
    api("/facturas").catch(() => []),
    api("/huespedes").catch(() => []),
  ]);
  cache = { habitaciones, reservas, estadias, facturas, huespedes };
  renderDashboard();
  renderHabitaciones();
  renderHuespedes();
  renderReservas();
  renderEstadias();
  renderPagos();
  renderReportes();
}

(async function init() {
  bindLayout();
  bindForms();
  await loadAll();
})();
