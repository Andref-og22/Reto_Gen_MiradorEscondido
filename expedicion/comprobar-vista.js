(() => {
  if (window.parent === window) return;
  const decir = (ok, detalle) => ({ ok, detalle });
  const entradas = () => [...document.querySelectorAll('#formulario-ruta input[name="ruta"][type="radio"]')];
  const ids = ["sendero", "teleferico"];
  const esperado = { A: [false, true], B: [true, false], C: [false, false] };
  const $ = (selector) => document.querySelector(selector);

  function html() {
    const radios = entradas();
    if (radios.length !== 2 || !ids.every(id => radios.some(radio => radio.value === id))) {
      return decir(false, 'Revisa web/index.html. Dentro del formulario deben quedar dos radios con name="ruta" y los valores sendero y teleferico.');
    }
    for (const radio of radios) {
      const etiqueta = radio.closest("label");
      if (!etiqueta || !etiqueta.querySelector('[data-estado-ruta="' + radio.value + '"]')) {
        return decir(false, 'En cada tarjeta, el value del radio y el data-estado-ruta de su estado deben coincidir.');
      }
    }
    if (!$('#formulario-ruta button[type="submit"]')) return decir(false, "Falta el botón Confirmar mi ruta dentro del formulario.");
    return decir(true, "Sendero y Teleférico están listos para elegir.");
  }

  function css(movil) {
    const estructura = html();
    if (!estructura.ok) return estructura;
    const ancho = document.documentElement.clientWidth;
    const tarjetas = entradas().map(radio => radio.closest("label").getBoundingClientRect());
    const primera = tarjetas[0];
    const segunda = tarjetas[1];
    const boton = $('#formulario-ruta button[type="submit"]').getBoundingClientRect();
    const desborda = document.documentElement.scrollWidth > ancho + 1;
    if (movil) {
      if (ancho > 420) return decir(false, "Abre la vista móvil y vuelve a comprobar.");
      if (desborda || primera.right > ancho + 1 || segunda.right > ancho + 1 || boton.right > ancho + 1 ||
          Math.min(primera.height, segunda.height, boton.height) <= 0 || segunda.top < primera.bottom - 1) {
        return decir(false, "A 390 px, ambas tarjetas deben verse completas, una debajo de la otra. Revisa la regla para .rutas en web/estilos.css.");
      }
      return decir(true, "La página cabe en la vista móvil.");
    }
    if (ancho < 680 || desborda || Math.min(primera.width, segunda.width) <= 0 ||
        Math.abs(primera.top - segunda.top) > 2 || segunda.left < primera.right - 1) {
      return decir(false, "En la vista amplia, las dos tarjetas deben volver a quedar en la misma fila.");
    }
    return decir(true, "El diseño funciona en vista móvil y amplia.");
  }

  function datos() {
    const estructura = html();
    if (!estructura.ok) return estructura;
    if (typeof reportesParque === "undefined") return decir(false, "El archivo web/reportes.js no se pudo leer. Vuelve a ejecutar GenerarReportes.");
    for (const codigo of Object.keys(esperado)) {
      const reporte = reportesParque[codigo];
      if (!reporte || !Array.isArray(reporte.rutas) || reporte.rutas.length !== 2) {
        return decir(false, "El reporte " + codigo + " debe contener Sendero y Teleférico. Completa la lista y ejecuta GenerarReportes.");
      }
      for (const [i, id] of ids.entries()) {
        const ruta = reporte.rutas.find(fila => fila.id === id);
        if (!ruta || ruta.disponible !== esperado[codigo][i]) {
          return decir(false, "Revisa la disponibilidad de " + (id === "sendero" ? "Sendero" : "Teleférico") + " en el reporte " + codigo + ".");
        }
        if (!ruta.disponible && (typeof ruta.motivo !== "string" || !ruta.motivo.trim())) {
          return decir(false, "El reporte " + codigo + " necesita el motivo de cierre de " + id + ".");
        }
      }
    }
    return decir(true, "La página leyó los tres reportes generados por Java.");
  }

  function probarAcciones(incluirC) {
    const reportes = datos();
    if (!reportes.ok) return reportes;
    const select = $("#reporte-activo");
    const form = $("#formulario-ruta");
    const postal = $("#postal");
    const mensaje = $("#mensaje");
    if (!select || !postal || !mensaje || !form) return decir(false, "La página necesita el selector, el formulario, el mensaje y la postal del archivo inicial.");
    const previo = select.value;
    const radioPrevio = entradas().find(radio => radio.checked);
    try {
      for (const codigo of incluirC ? ["A", "B", "C"] : ["A", "B"]) {
        select.value = codigo;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        const orden = [...reportesParque[codigo].rutas].sort((a, b) => Number(b.disponible) - Number(a.disponible));
        for (const ruta of orden) {
          const radio = entradas().find(input => input.value === ruta.id);
          radio.click();
          const evento = new Event("submit", { bubbles: true, cancelable: true });
          form.dispatchEvent(evento);
          if (!evento.defaultPrevented) return decir(false, "En confirmarRuta conserva evento.preventDefault() para que el formulario no recargue la página.");
          if (ruta.disponible && (postal.hidden || !mensaje.textContent.trim())) {
            return decir(false, "En " + codigo + ", " + ruta.id + " debe confirmar la ruta y mostrar la postal.");
          }
          if (!ruta.disponible && (!postal.hidden || !mensaje.textContent.includes(ruta.motivo))) {
            return decir(false, "En " + codigo + ", " + ruta.id + " debe mostrar su motivo de cierre y mantener la postal oculta.");
          }
        }
      }
      return decir(true, incluirC ? "La página responde bien también cuando se cierran las dos rutas." :
        "La página muestra la postal por la ruta abierta y la oculta al elegir una cerrada.");
    } finally {
      select.value = previo;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      for (const radio of entradas()) radio.checked = radio === radioPrevio;
    }
  }

  function pruebas() {
    const producto = probarAcciones(true);
    if (!producto.ok) return producto;
    if (typeof avancePruebas === "undefined" || avancePruebas.total !== 2) {
      return decir(false, "Todavía faltan las dos comprobaciones de Java. Compila y ejecuta PruebaRutas antes de volver a pulsar el botón.");
    }
    return decir(true, "La guía responde a los tres reportes y Java confirmó los dos casos del Sendero.");
  }

  const acciones = {
    html,
    "css-movil": () => css(true),
    "css-amplio": () => css(false),
    datos,
    interaccion: () => probarAcciones(false),
    pruebas
  };
  window.addEventListener("message", (evento) => {
    const solicitud = evento.data;
    if (evento.source !== window.parent || !solicitud || solicitud.tipo !== "expedicion-revisar" ||
        !Number.isInteger(solicitud.id) || !Object.hasOwn(acciones, solicitud.accion)) return;
    let resultado;
    try {
      resultado = acciones[solicitud.accion]();
    } catch {
      resultado = decir(false, "La vista tiene un error de JavaScript. Revisa el archivo que editaste, guarda y vuelve a intentar.");
    }
    window.parent.postMessage({ tipo: "expedicion-resultado", id: solicitud.id, ...resultado }, "*");
  });
})();
