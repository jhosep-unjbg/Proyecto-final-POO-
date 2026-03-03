const $ = (id) => document.getElementById(id);
const baseUrlInput = $("baseUrl");
const toast = $("toast");
const apiStatus = $("apiStatus");

const storedUrl = localStorage.getItem("backend_url");
if (storedUrl) baseUrlInput.value = storedUrl;

const pageButtons = Array.from(document.querySelectorAll(".page-btn"));
const pagePanels = Array.from(document.querySelectorAll(".page-panel"));

function showPage(page) {
  const pageExists = pagePanels.some((panel) => panel.dataset.page === page);
  const targetPage = pageExists ? page : "recepcion";

  pagePanels.forEach((panel) => panel.classList.toggle("active", panel.dataset.page === targetPage));
  pageButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.page === targetPage));

  localStorage.setItem("frontend_page", targetPage);
  window.location.hash = targetPage;
}

pageButtons.forEach((btn) => {
  btn.addEventListener("click", () => showPage(btn.dataset.page));
});

const initialPage = window.location.hash.replace("#", "") || localStorage.getItem("frontend_page") || "recepcion";
showPage(initialPage);

window.addEventListener("hashchange", () => {
  showPage(window.location.hash.replace("#", ""));
});

$("saveConfig").addEventListener("click", () => {
  localStorage.setItem("backend_url", baseUrlInput.value.trim());
  showToast("Configuración guardada");
});

$("testConnection").addEventListener("click", testConnection);
$("loadHabitaciones").addEventListener("click", loadHabitaciones);
$("loadHuespedes").addEventListener("click", () => loadHuespedes());
$("loadReservas").addEventListener("click", loadReservas);
$("loadPaquetes").addEventListener("click", loadPaquetes);
$("loadFacturas").addEventListener("click", loadFacturas);
$("loadEstadias").addEventListener("click", loadEstadias);
$("loadRecepcionistas").addEventListener("click", loadRecepcionistas);
$("loadHistorialPrecios").addEventListener("click", () => loadHistorialPrecios());

$("habitacionForm").addEventListener("submit", onCrearHabitacion);
$("precioForm").addEventListener("submit", onCambiarPrecio);
$("huespedForm").addEventListener("submit", onCrearHuesped);
$("buscarHuespedForm").addEventListener("submit", onBuscarHuespedes);
$("recepcionistaForm").addEventListener("submit", onCrearRecepcionista);
$("reservaForm").addEventListener("submit", onCrearReserva);
$("paqueteForm").addEventListener("submit", onCrearPaquete);
$("checkinForm").addEventListener("submit", onCheckin);
$("checkoutForm").addEventListener("submit", onCheckout);
$("historialPrecioForm").addEventListener("submit", onFiltrarHistorialPrecios);
$("calculoEstadiaForm").addEventListener("submit", onCalcularEstadia);
$("facturaEstadiaForm").addEventListener("submit", onCrearFacturaDesdeEstadia);

async function onCrearHabitacion(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  await post("/habitaciones", {
    numero: String(fd.get("numero")),
    piso: Number(fd.get("piso")),
    tipoHabitacionId: Number(fd.get("tipoHabitacionId")),
    precioPorNoche: Number(fd.get("precioPorNoche")),
  });
  e.target.reset();
  loadHabitaciones();
}

async function onCambiarPrecio(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const habitacionId = Number(fd.get("habitacionId"));
  await patch(
    `/habitaciones/${habitacionId}/precio`,
    { precioPorNoche: Number(fd.get("precioPorNoche")) },
    { "x-rol": "admin", "x-admin-usuario": String(fd.get("adminUsuario")) }
  );
  e.target.reset();
  await Promise.all([loadHabitaciones(), loadHistorialPrecios()]);
}

async function onCrearHuesped(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  await post("/huespedes", {
    nombres: String(fd.get("nombres")),
    apellidos: String(fd.get("apellidos")),
    dni: String(fd.get("dni")),
    telefono: String(fd.get("telefono")),
    email: String(fd.get("email") || ""),
  });
  e.target.reset();
  loadHuespedes();
}

async function onBuscarHuespedes(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  await loadHuespedes({
    nombres: String(fd.get("nombres") || ""),
    apellidos: String(fd.get("apellidos") || ""),
    dni: String(fd.get("dni") || ""),
    telefono: String(fd.get("telefono") || ""),
  });
}

async function onCrearRecepcionista(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  await post("/recepcionistas", {
    nombres: String(fd.get("nombres")),
    apellidos: String(fd.get("apellidos")),
    email: String(fd.get("email")),
    turno: String(fd.get("turno")),
  });
  e.target.reset();
  loadRecepcionistas();
}

async function onCrearReserva(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  await post("/reservas", {
    huespedId: Number(fd.get("huespedId")),
    habitacionId: Number(fd.get("habitacionId")),
    fechaInicio: String(fd.get("fechaInicio")),
    fechaFin: String(fd.get("fechaFin")),
  });
  e.target.reset();
  loadReservas();
}

async function onCrearPaquete(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  await post("/paquetes", {
    nombre: String(fd.get("nombre")),
    descripcion: String(fd.get("descripcion")),
    precio: Number(fd.get("precio")),
    moneda: String(fd.get("moneda") || "PEN"),
  });
  e.target.reset();
  loadPaquetes();
}

async function onCheckin(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  await post("/estadias/checkin", { reservaId: Number(fd.get("reservaId")) });
  e.target.reset();
  loadEstadias();
}

async function onCheckout(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  await post("/estadias/checkout", { estadiaId: Number(fd.get("estadiaId")) });
  e.target.reset();
  loadEstadias();
}

async function onCalcularEstadia(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const estadiaId = Number(fd.get("estadiaId"));
  const resumen = await get(`/facturas/calcular/estadia/${estadiaId}`);
  $("resumenCobro").innerHTML = `<div class="item"><b>Estadía #${resumen.estadiaId}</b><br/>Reserva: ${resumen.reservaId} · Habitación: ${resumen.habitacionId}<br/>Noches: ${resumen.noches} · Precio noche: S/ ${resumen.precioPorNoche}<br/><b>Total a pagar: S/ ${resumen.total}</b></div>`;
}

async function onCrearFacturaDesdeEstadia(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const estadiaId = Number(fd.get("estadiaId"));
  const numero = String(fd.get("numero") || "").trim();
  await post(`/facturas/desde-estadia/${estadiaId}`, numero ? { numero } : {});
  e.target.reset();
  $("resumenCobro").innerHTML = "";
  loadFacturas();
}

async function onFiltrarHistorialPrecios(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const habitacionId = String(fd.get("habitacionId") || "").trim();
  await loadHistorialPrecios(habitacionId ? Number(habitacionId) : undefined);
}

async function loadHabitaciones() {
  const data = await get("/habitaciones");
  $("habitacionesList").innerHTML = data
    .map((h) => `<div class="item"><b>#${h.id}</b> Hab. ${h.numero} · Piso ${h.piso}<br/>Estado: ${h.estado} · S/ ${h.precioPorNoche}</div>`)
    .join("");
}

async function loadHuespedes(filtros = {}) {
  const query = new URLSearchParams();
  Object.entries(filtros).forEach(([key, value]) => {
    if (String(value || "").trim() !== "") query.append(key, String(value));
  });
  const data = await get(`/huespedes${query.toString() ? `?${query.toString()}` : ""}`);
  $("huespedesList").innerHTML = data
    .map((h) => `<div class="item"><b>#${h.id}</b> ${h.nombre} ${h.apellido}<br/>DNI: ${h.dni} · Tel: ${h.telefono}</div>`)
    .join("");
}

async function loadRecepcionistas() {
  const data = await get("/recepcionistas");
  $("recepcionistasList").innerHTML = data
    .map((r) => `<div class="item"><b>#${r.id}</b> ${r.nombres} ${r.apellidos}<br/>${r.email} · Turno: ${r.turno}<br/>Estado: ${r.activo ? "✅ En turno" : "⏸️ Fuera de turno"}<br/><button onclick="marcarTurno(${r.id})">${r.activo ? "Marcar salida" : "Marcar ingreso"}</button></div>`)
    .join("");
}

async function loadReservas() {
  const data = await get("/reservas");
  $("reservasList").innerHTML = data
    .map((r) => `<div class="item"><b>#${r.id}</b> Huésped ${r.huespedId} · Hab ${r.habitacionId}<br/>${new Date(r.fechaInicio).toLocaleDateString()} → ${new Date(r.fechaFin).toLocaleDateString()} · ${r.estado}<br/><button onclick="confirmarReserva(${r.id})">Confirmar</button> <button onclick="cancelarReserva(${r.id})">Cancelar</button></div>`)
    .join("");
}

async function loadPaquetes() {
  const data = await get("/paquetes");
  $("paquetesList").innerHTML = data
    .map((p) => `<div class="item"><b>#${p.id}</b> ${p.nombre}<br/>${p.descripcion}<br/>${p.moneda} ${p.precio}</div>`)
    .join("");
}

async function loadFacturas() {
  const data = await get("/facturas");
  $("facturasList").innerHTML = data
    .map((f) => `<div class="item"><b>${f.numero}</b> (ID ${f.id})<br/>Reserva ${f.reservaId} · Total ${f.total}</div>`)
    .join("");
}

async function loadEstadias() {
  const data = await get("/estadias");
  $("estadiasList").innerHTML = data
    .map((e) => `<div class="item"><b>#${e.id}</b> Reserva ${e.reservaId}<br/>Check-in: ${new Date(e.fechaCheckIn).toLocaleString()}<br/>Check-out: ${e.fechaCheckOut ? new Date(e.fechaCheckOut).toLocaleString() : "Pendiente"}</div>`)
    .join("");
}

async function loadHistorialPrecios(habitacionId) {
  const query = habitacionId ? `?habitacionId=${habitacionId}` : "";
  const data = await get(`/habitaciones/historial/precios${query}`);
  $("historialPreciosList").innerHTML = data
    .map((h) => `<div class="item"><b>#${h.id}</b> Habitación ${h.habitacionId}<br/>S/ ${h.precioAnterior} → S/ ${h.precioNuevo}<br/>Admin: ${h.adminUsuario} · ${new Date(h.fechaCambio).toLocaleString()}</div>`)
    .join("");
}

window.confirmarReserva = async (id) => {
  await patch(`/reservas/${id}/confirmar`, {});
  loadReservas();
};

window.cancelarReserva = async (id) => {
  await patch(`/reservas/${id}/cancelar`, {});
  loadReservas();
};

window.marcarTurno = async (id) => {
  await patch(`/recepcionistas/${id}/turno`, {});
  loadRecepcionistas();
};

async function testConnection() {
  try {
    await get("/health");
    apiStatus.textContent = "Conectado";
    apiStatus.classList.add("online");
    showToast("Backend conectado");
  } catch (e) {
    apiStatus.textContent = "Desconectado";
    apiStatus.classList.remove("online");
    showToast(e.message || "Sin conexión", true);
  }
}

function apiBase() {
  return baseUrlInput.value.trim().replace(/\/$/, "");
}

async function get(path) {
  const r = await fetch(apiBase() + path);
  const data = await parseJson(r);
  if (!r.ok) throw new Error(data.mensaje || "Error");
  return data;
}

async function post(path, payload) {
  const r = await fetch(apiBase() + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await parseJson(r);
  if (!r.ok) {
    showToast(data.mensaje || "Error", true);
    throw new Error(data.mensaje || "Error");
  }
  showToast("Operación exitosa");
  return data;
}

async function patch(path, payload, extraHeaders = {}) {
  const r = await fetch(apiBase() + path, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...extraHeaders },
    body: JSON.stringify(payload),
  });
  const data = await parseJson(r);
  if (!r.ok) {
    showToast(data.mensaje || "Error", true);
    throw new Error(data.mensaje || "Error");
  }
  showToast("Cambio aplicado");
  return data;
}

async function parseJson(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.style.display = "block";
  toast.style.borderColor = isError ? "#ef4444" : "#22c55e";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2200);
}

Promise.allSettled([
  testConnection(),
  loadHabitaciones(),
  loadHuespedes(),
  loadReservas(),
  loadPaquetes(),
  loadFacturas(),
  loadEstadias(),
  loadRecepcionistas(),
  loadHistorialPrecios(),
]);
