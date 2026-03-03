const $ = (id) => document.getElementById(id);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const state = { habitaciones: [], reservas: [], huespedes: [], estadias: [], facturas: [], charts: {} };
let confirmResolver = null;

function apiBase() { return localStorage.getItem("backend_url") || "http://localhost:3000"; }
async function api(path, opts = {}) {
  const r = await fetch(apiBase() + path, { headers: { "Content-Type": "application/json", ...(opts.headers || {}) }, ...opts });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.mensaje || "Error API");
  return data;
}
function toast(msg, isError = false) {
  const t = $("toast");
  t.textContent = msg;
  t.style.display = "block";
  t.style.borderColor = isError ? "#b91c1c" : "#15803d";
  setTimeout(() => (t.style.display = "none"), 2200);
}

function setView(view) {
  $$(".nav").forEach((n) => n.classList.toggle("active", n.dataset.view === view));
  $$(".view").forEach((v) => v.classList.toggle("active", v.dataset.view === view));
}

function setupShell() {
  $$(".nav").forEach((n) => n.addEventListener("click", () => setView(n.dataset.view)));
  $("sidebarToggle").addEventListener("click", () => $("sidebar").classList.toggle("collapsed"));
  $("themeToggle").addEventListener("click", () => {
    const nxt = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = nxt;
    localStorage.setItem("theme", nxt);
  });
  document.body.dataset.theme = localStorage.getItem("theme") || "dark";
  $("quickDate").value = new Date().toISOString().slice(0, 10);
  $("notificationBtn").addEventListener("click", () => toast("No hay alertas críticas hoy"));
  $$("[data-view-jump]").forEach((b) => b.addEventListener("click", () => setView(b.dataset.viewJump)));
}

function statusChip(estado) {
  const key = String(estado || "Pendiente").toLowerCase().replace(/\s+/g, "-").replace(/_/g, "-");
  return `<span class="status-chip ${key}">${estado}</span>`;
}

function animateCount(el, to) {
  let cur = 0;
  const step = Math.max(1, Math.ceil(to / 18));
  const timer = setInterval(() => {
    cur += step;
    if (cur >= to) {
      el.textContent = String(to);
      clearInterval(timer);
    } else {
      el.textContent = String(cur);
    }
  }, 28);
}

function monthlyKey(d) {
  const date = new Date(d);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function renderDashboard() {
  const totalHab = state.habitaciones.length;
  const ocupadas = state.habitaciones.filter((h) => String(h.estado || "").toUpperCase().includes("OCUP")).length;
  const checkinsHoy = state.estadias.filter((e) => String(e.fechaCheckIn || "").slice(0, 10) === $("quickDate").value).length;
  const checkoutsHoy = state.estadias.filter((e) => e.fechaCheckOut && String(e.fechaCheckOut).slice(0, 10) === $("quickDate").value).length;
  const ingresoDia = state.facturas.filter((f) => String(f.fecha || "").slice(0, 10) === $("quickDate").value).reduce((a, b) => a + Number(b.total || 0), 0);
  const ocupacionPct = totalHab ? Math.round((ocupadas / totalHab) * 100) : 0;

  $("heroMetrics").innerHTML = `
    <div class="hero-pill">Ocupación actual<b>${ocupacionPct}%</b></div>
    <div class="hero-pill">Check-ins hoy<b>${checkinsHoy}</b></div>
    <div class="hero-pill">Check-outs hoy<b>${checkoutsHoy}</b></div>
    <div class="hero-pill">Ingresos del día<b>S/ ${ingresoDia.toFixed(2)}</b></div>`;

  const kpis = [
    ["Total de habitaciones", totalHab, "↑ 4% mensual", "up"],
    ["Reservas activas", state.reservas.filter((r) => String(r.estado).toUpperCase() !== "CANCELADA").length, "↑ 2%", "up"],
    ["Estadías en curso", state.estadias.filter((e) => !e.fechaCheckOut).length, "↓ 1%", "down"],
    ["Ingresos acumulados", Math.round(state.facturas.reduce((a, b) => a + Number(b.total || 0), 0)), "↑ 9%", "up"],
  ];
  $("kpiGrid").innerHTML = kpis
    .map((k, i) => `<article class="kpi"><div>${k[0]}</div><div class="value" id="kpiValue${i}">0</div><div class="trend ${k[3]}">${k[2]}</div></article>`)
    .join("");
  kpis.forEach((k, i) => animateCount($(`kpiValue${i}`), Number(k[1])));

  const months = [...new Set([...state.estadias.map((e) => monthlyKey(e.fechaCheckIn)), ...state.facturas.map((f) => monthlyKey(f.fecha))])].sort();
  const occ = months.map((m) => state.estadias.filter((e) => monthlyKey(e.fechaCheckIn) === m).length);
  const ingresos = months.map((m) => state.facturas.filter((f) => monthlyKey(f.fecha) === m).reduce((a, b) => a + Number(b.total || 0), 0));
  const tipoDist = Object.entries(state.habitaciones.reduce((acc, h) => ((acc[h.tipoHabitacionId] = (acc[h.tipoHabitacionId] || 0) + 1), acc), {}));

  state.charts.oc?.destroy(); state.charts.ing?.destroy(); state.charts.tipo?.destroy();
  state.charts.oc = new Chart($("ocupacionChart"), { type: "bar", data: { labels: months, datasets: [{ data: occ, backgroundColor: "#1f7a5d" }] }, options: { plugins: { legend: { display: false } } } });
  state.charts.ing = new Chart($("ingresosChart"), { type: "line", data: { labels: months, datasets: [{ data: ingresos, borderColor: "#d4b36a", tension: .35 }] }, options: { plugins: { legend: { display: false } } } });
  state.charts.tipo = new Chart($("tipoChart"), { type: "doughnut", data: { labels: tipoDist.map((t) => `Tipo ${t[0]}`), datasets: [{ data: tipoDist.map((t) => t[1]), backgroundColor: ["#d4b36a", "#1f7a5d", "#7c3aed", "#ef4444"] }] }, options: { plugins: { legend: { position: "bottom" } } } });
}

function renderReservas() {
  const q = $("reservaSearch").value.toLowerCase();
  const est = $("reservaEstadoFiltro").value;
  const from = $("reservaDesde").value;
  const to = $("reservaHasta").value;
  let items = [...state.reservas];
  if (q) items = items.filter((r) => `${r.id} ${r.huespedId}`.toLowerCase().includes(q));
  if (est) items = items.filter((r) => String(r.estado) === est);
  if (from) items = items.filter((r) => String(r.fechaInicio).slice(0, 10) >= from);
  if (to) items = items.filter((r) => String(r.fechaFin).slice(0, 10) <= to);

  const estados = [...new Set(state.reservas.map((r) => String(r.estado)))];
  $("reservaEstadoFiltro").innerHTML = `<option value="">Estado</option>${estados.map((e) => `<option ${e===est?"selected":""}>${e}</option>`).join("")}`;

  $("reservasTable").innerHTML = items
    .map((r) => `<tr><td>#${r.id}</td><td>${r.huespedId}</td><td>${r.habitacionId}</td><td>${new Date(r.fechaInicio).toLocaleDateString()} → ${new Date(r.fechaFin).toLocaleDateString()}</td><td>${statusChip(r.estado)}</td><td><button onclick="openDrawer(${r.id})">Ver</button></td></tr>`)
    .join("");

  const cal = items.map((r) => `<div>• Reserva #${r.id} · ${new Date(r.fechaInicio).toLocaleDateString()} - ${new Date(r.fechaFin).toLocaleDateString()}</div>`).join("") || "Sin reservas para la selección";
  $("calendarView").innerHTML = `<h3>Agenda hotel</h3>${cal}`;
}

window.openDrawer = (id) => {
  const r = state.reservas.find((x) => x.id === id);
  if (!r) return;
  const total = state.facturas.filter((f) => f.reservaId === r.id).reduce((a, b) => a + Number(b.total || 0), 0);
  $("drawerBody").innerHTML = `
    <p><b>Reserva #${r.id}</b></p>
    <p>Huésped: ${r.huespedId}</p>
    <p>Habitación: ${r.habitacionId}</p>
    <p>Fechas: ${new Date(r.fechaInicio).toLocaleDateString()} → ${new Date(r.fechaFin).toLocaleDateString()}</p>
    <p>Total + pagos: S/ ${total.toFixed(2)}</p>
    <h4>Timeline</h4>
    <div class="timeline"><div>Creación de reserva</div><div>Estado actual: ${r.estado}</div><div>Última actualización operativa</div></div>`;
  $("reservaDrawer").classList.remove("hidden");
};

function renderHabitaciones() {
  const q = $("habitacionSearch").value.toLowerCase();
  const estadoSel = $("habitacionEstadoFiltro").value;
  let items = [...state.habitaciones];
  if (q) items = items.filter((h) => String(h.numero).toLowerCase().includes(q));
  if (estadoSel) items = items.filter((h) => String(h.estado) === estadoSel);

  const estados = [...new Set(state.habitaciones.map((h) => String(h.estado)))];
  $("habitacionEstadoFiltro").innerHTML = `<option value="">Estado</option>${estados.map((e) => `<option ${e===estadoSel?"selected":""}>${e}</option>`).join("")}`;

  $("habitacionesTable").innerHTML = items.map((h) => `<tr><td>${h.numero}</td><td>${h.tipoHabitacionId}</td><td>${h.estado}</td><td>S/ ${Number(h.precioPorNoche).toFixed(2)}</td><td><button onclick="changeRoomState(${h.id})">Cambiar estado</button></td></tr>`).join("");

  const floors = {};
  items.forEach((h) => {
    const f = h.piso || 0;
    floors[f] = floors[f] || [];
    floors[f].push(h);
  });
  $("floorMap").innerHTML = Object.entries(floors)
    .map(([f, rs]) => `<div><b>Piso ${f}</b><div class="floor-row">${rs.map((h) => `<div class="room-box ${String(h.estado || "").toLowerCase()}">#${h.numero}<br/><small>${h.estado}</small></div>`).join("")}</div></div>`)
    .join("");
}

window.changeRoomState = async (id) => {
  const h = state.habitaciones.find((x) => x.id === id);
  if (!h) return;
  const opts = ["DISPONIBLE", "OCUPADA", "LIMPIEZA", "MANTENIMIENTO"];
  const next = opts[(opts.indexOf(String(h.estado).toUpperCase()) + 1) % opts.length];
  const ok = await askConfirm(`¿Desea cambiar el estado de la habitación ${h.numero} a ${next}?`);
  if (!ok) return;
  await api(`/habitaciones/${id}`, { method: "PUT", body: JSON.stringify({ ...h, estado: next }) }).catch(() => toast("No se pudo cambiar estado en backend", true));
  await loadAll();
};

function renderHuespedes() {
  const q = $("huespedSearch").value.toLowerCase();
  const items = state.huespedes.filter((h) => `${h.nombre} ${h.apellido} ${h.dni} ${h.telefono}`.toLowerCase().includes(q));
  $("huespedesList").innerHTML = (items.length ? items.map((h) => `<article class="card"><b>${h.nombre} ${h.apellido}</b><div>DNI: ${h.dni}</div><div>Tel: ${h.telefono}</div></article>`).join("") : `<article class="card"><div class="skeleton"></div><div class="skeleton" style="margin-top:8px"></div></article>`);
}

function renderEstadias() {
  $("estadiasList").innerHTML = state.estadias.map((e) => `<article class="card"><b>Estadía #${e.id}</b><div>Reserva: ${e.reservaId}</div><div>Check-in: ${new Date(e.fechaCheckIn).toLocaleString()}</div><div>Check-out: ${e.fechaCheckOut ? new Date(e.fechaCheckOut).toLocaleString() : "Pendiente"}</div></article>`).join("");
}

function renderPagos() {
  const from = $("pagoDesde").value;
  const to = $("pagoHasta").value;
  let pagos = [...state.facturas];
  if (from) pagos = pagos.filter((p) => String(p.fecha).slice(0, 10) >= from);
  if (to) pagos = pagos.filter((p) => String(p.fecha).slice(0, 10) <= to);
  const totalHoy = pagos.filter((p) => String(p.fecha).slice(0, 10) === $("quickDate").value).reduce((a, b) => a + Number(b.total || 0), 0);
  const pendientes = pagos.filter((p) => Number(p.total || 0) <= 0).length;
  const metodos = 3;
  $("pagoStats").innerHTML = `
    <article class="kpi"><div>Total recaudado hoy</div><div class="value">S/ ${totalHoy.toFixed(2)}</div></article>
    <article class="kpi"><div>Pendientes</div><div class="value">${pendientes}</div></article>
    <article class="kpi"><div>Métodos de pago</div><div class="value">${metodos}</div></article>
    <article class="kpi"><div>Pagos filtrados</div><div class="value">${pagos.length}</div></article>`;
  $("pagosList").innerHTML = pagos.map((p) => `<article class="card"><b>${p.numero || "Factura"}</b><div>Fecha: ${new Date(p.fecha).toLocaleDateString()}</div><div>Total: S/ ${Number(p.total || 0).toFixed(2)}</div><div>${Number(p.total || 0) > 0 ? statusChip("Confirmada") : statusChip("Pendiente")}</div><button onclick="downloadRecibo(${p.id})">Descargar recibo</button></article>`).join("");
}

window.downloadRecibo = (id) => toast(`Recibo #${id} generado (demo UI)`);

async function renderTarifasReportes() {
  const hist = await api("/habitaciones/historial/precios").catch(() => []);
  $("historialPreciosList").innerHTML = hist.length ? hist.slice(-12).reverse().map((h) => `<div>Hab ${h.habitacionId}: S/${h.precioAnterior} → S/${h.precioNuevo} · ${new Date(h.fechaCambio).toLocaleDateString()}</div>`).join("") : "Sin historial.";
  const total = state.facturas.reduce((a, b) => a + Number(b.total || 0), 0);
  $("reportesResumen").innerHTML = `<p><b>Facturas:</b> ${state.facturas.length}</p><p><b>Ingresos acumulados:</b> S/ ${total.toFixed(2)}</p><p><b>Huéspedes activos:</b> ${state.huespedes.length}</p>`;
  $("emptyState").classList.toggle("hidden", state.facturas.length > 0 || state.reservas.length > 0);
}

async function askConfirm(message) {
  const dialog = $("confirmDialog");
  $("confirmText").textContent = message;
  dialog.showModal();
  return new Promise((resolve) => {
    confirmResolver = resolve;
  });
}

function bindUI() {
  $("closeDrawer").addEventListener("click", () => $("reservaDrawer").classList.add("hidden"));
  $("toggleCalendar").addEventListener("click", () => $("calendarView").classList.toggle("hidden"));
  $("reservaSearch").addEventListener("input", renderReservas);
  $("reservaEstadoFiltro").addEventListener("change", renderReservas);
  $("reservaDesde").addEventListener("change", renderReservas);
  $("reservaHasta").addEventListener("change", renderReservas);
  $("habitacionSearch").addEventListener("input", renderHabitaciones);
  $("habitacionEstadoFiltro").addEventListener("change", renderHabitaciones);
  $("huespedSearch").addEventListener("input", renderHuespedes);
  $("filtrarPagos").addEventListener("click", renderPagos);
  $("confirmOk").addEventListener("click", () => { $("confirmDialog").close(); confirmResolver?.(true); });
  $("confirmCancel").addEventListener("click", () => { $("confirmDialog").close(); confirmResolver?.(false); });

  $("checkinForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = Number(new FormData(e.target).get("reservaId"));
    await api("/estadias/checkin", { method: "POST", body: JSON.stringify({ reservaId: id }) });
    await loadAll();
    toast("Check-in registrado");
  });
  $("checkoutForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = Number(new FormData(e.target).get("estadiaId"));
    await api("/estadias/checkout", { method: "POST", body: JSON.stringify({ estadiaId: id }) });
    await loadAll();
    toast("Check-out registrado");
  });
}

async function loadAll() {
  const [habitaciones, reservas, huespedes, estadias, facturas] = await Promise.all([
    api("/habitaciones").catch(() => []),
    api("/reservas").catch(() => []),
    api("/huespedes").catch(() => []),
    api("/estadias").catch(() => []),
    api("/facturas").catch(() => []),
  ]);
  state.habitaciones = habitaciones;
  state.reservas = reservas;
  state.huespedes = huespedes;
  state.estadias = estadias;
  state.facturas = facturas;
  renderDashboard();
  renderReservas();
  renderHabitaciones();
  renderHuespedes();
  renderEstadias();
  renderPagos();
  renderTarifasReportes();
}

(async function init() {
  setupShell();
  bindUI();
  await loadAll();
})();
