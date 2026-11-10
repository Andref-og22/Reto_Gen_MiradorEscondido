(() => {
  const $ = selector => document.querySelector(selector);
  const menu = $("#menu");
  const frame = $("#preview");
  const zonaVista = $("#zona-vista");
  const consigna = $("#consigna");
  const titulo = $("#titulo-parada");
  const resultado = $("#resultado");
  const acciones = $("#acciones");
  const espera = new Map();
  const clave = "bruma-verde-v2:" + location.pathname;
  const fin = paradas.length;
  let estado = { completadas: 0, actual: 0, reporte: "A" };
  let revision = 0;
  let ocupado = false;

  try {
    const guardado = JSON.parse(localStorage.getItem(clave));
    if (guardado && Number.isInteger(guardado.completadas) && guardado.completadas >= 0 &&
        guardado.completadas < fin && Number.isInteger(guardado.actual) && guardado.actual >= 0 &&
        guardado.actual <= guardado.completadas + 1 && ["A", "B"].includes(guardado.reporte)) estado = guardado;
  } catch {}

  function guardar() {
    try { localStorage.setItem(clave, JSON.stringify(estado)); } catch {}
  }

  function informar(detalle, tono = "") {
    resultado.textContent = detalle;
    resultado.dataset.estado = tono;
  }

  function cambiarAncho(px, medir = false) {
    frame.style.width = px === 390 && !medir ? "min(390px, 100%)" : px ? px + "px" : "100%";
    $("#ancho-movil").setAttribute("aria-pressed", String(px === 390));
    $("#ancho-amplio").setAttribute("aria-pressed", String(px === 0));
  }

  function recargar() {
    const codigo = estado.actual === 5 ? "C" : estado.reporte;
    const marco = frame.parentElement;
    const cargando = $("#cargando-vista");
    marco.setAttribute("aria-busy", "true");
    cargando.hidden = false;
    return new Promise((resolve, reject) => {
      const terminar = () => {
        marco.setAttribute("aria-busy", "false");
        cargando.hidden = true;
      };
      const listo = () => {
        clearTimeout(timer);
        terminar();
        resolve();
      };
      const timer = setTimeout(() => {
        frame.removeEventListener("load", listo);
        terminar();
        reject(new Error("La vista no cargó. Revisa que extrajiste todo el ZIP y que la carpeta web sigue junto a este archivo."));
      }, 5000);
      frame.addEventListener("load", listo, { once: true });
      const query = new URLSearchParams({ parada: String(estado.actual), reporte: codigo, revision: String(++revision) });
      frame.src = "web/index.html?" + query;
    });
  }

  window.addEventListener("message", evento => {
    const m = evento.data;
    if (evento.source !== frame.contentWindow || !m || m.tipo !== "expedicion-resultado" ||
        !espera.has(m.id) || typeof m.ok !== "boolean" || typeof m.detalle !== "string") return;
    espera.get(m.id)(m);
  });

  function pedirRevision(accion) {
    return new Promise((resolve, reject) => {
      const id = ++revision;
      const timer = setTimeout(() => {
        espera.delete(id);
        reject(new Error("No llegó la comprobación. Guarda el archivo que editaste y revisa que web/index.html conserve sus scripts al inicio."));
      }, 5000);
      espera.set(id, valor => {
        clearTimeout(timer);
        espera.delete(id);
        resolve(valor);
      });
      frame.contentWindow.postMessage({ tipo: "expedicion-revisar", id, accion }, "*");
    });
  }

  const repintar = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  async function revisar(parada) {
    await recargar();
    if (parada.accion !== "css") return pedirRevision(parada.accion);
    cambiarAncho(390, true);
    try {
      await repintar();
      const movil = await pedirRevision("css-movil");
      if (!movil.ok) return movil;
      cambiarAncho(740);
      await repintar();
      return await pedirRevision("css-amplio");
    } finally {
      cambiarAncho(390);
    }
  }

  function boton(texto, clase, callback) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = clase;
    b.textContent = texto;
    b.addEventListener("click", callback);
    return b;
  }

  function pintarMenu() {
    menu.replaceChildren();
    $("#progreso").value = estado.completadas;
    $("#progreso-texto").textContent = estado.completadas + " de 5 paradas";
    for (const [i, parada] of [...paradas, { corta: "Cierre" }].entries()) {
      const b = boton("", "punto", () => abrir(i));
      const indice = document.createElement("span");
      indice.textContent = i === 0 ? "·" : i === fin ? "✓" : String(i).padStart(2, "0");
      const detalle = document.createElement("span");
      detalle.textContent = parada.corta;
      const texto = document.createElement("small");
      b.disabled = i > estado.completadas + 1;
      texto.textContent = i === estado.actual ? "Estás aquí" :
        i > 0 && i <= estado.completadas ? "Completada" :
        b.disabled ? "Se abre más adelante" : "Disponible";
      if (i === estado.actual) b.setAttribute("aria-current", "step");
      detalle.append(texto);
      b.append(indice, detalle);
      menu.append(b);
    }
    if (menu.scrollWidth > menu.clientWidth) {
      const punto = menu.querySelector('[aria-current="step"]');
      const desplazamiento = punto.getBoundingClientRect().left - menu.getBoundingClientRect().left;
      menu.scrollLeft += desplazamiento - 4;
    }
  }

  function abrir(numero, mensaje = "", enfocar = true) {
    if (ocupado || numero > estado.completadas + 1) return;
    estado.actual = numero;
    guardar();
    pintarMenu();
    acciones.replaceChildren();
    zonaVista.hidden = numero === 0 || numero === fin;
    cambiarAncho(numero === 2 ? 390 : 0);
    informar(mensaje, mensaje ? "bien" : "");

    if (numero === fin) {
      $("#numero").textContent = "5 de 5 paradas";
      titulo.textContent = "Llegaron al mirador";
      consigna.innerHTML = '<img class="cierre-imagen" src="web/assets/postal-mirador.png" alt="Postal del mirador con montañas verdes y un valle entre nubes">' +
        '<p>La guía ya permite elegir una ruta y explica cuándo está cerrada. Comprobaron en Java qué pasa con el Sendero en dos reportes distintos.</p>' +
        '<h3>Qué mostrar en la demo</h3><ol><li>Elige un reporte con una ruta abierta y confirma esa ruta.</li>' +
        '<li>Cambia al reporte C y muestra qué informa la página.</li><li>Comparte los dos <code>OK</code> de la terminal y explica qué revisó uno de ellos.</li></ol>';
      const enlace = document.createElement("a");
      enlace.href = "web/index.html";
      enlace.target = "_blank";
      enlace.rel = "noopener";
      enlace.className = "enlace-boton";
      enlace.textContent = "Abrir guía de visitantes";
      acciones.append(enlace);
    } else {
      const parada = paradas[numero];
      $("#numero").textContent = numero ? "Parada " + numero + " de 5 · " + parada.area : "Inicio";
      titulo.textContent = parada.titulo;
      consigna.innerHTML = parada.contenido;
      if (numero === 0) {
        consigna.querySelector('input[value="' + estado.reporte + '"]').checked = true;
        acciones.append(boton("Empezar la expedición", "primario", () => {
          estado.reporte = consigna.querySelector("input:checked").value;
          abrir(1);
        }));
      } else {
        acciones.append(boton("Comprobar y continuar", "primario", comprobar));
        recargar().catch(error => informar(error.message, "revisar"));
      }
    }
    if (enfocar) titulo.focus();
  }

  async function comprobar(evento) {
    if (ocupado) return;
    const b = evento.currentTarget;
    const actual = estado.actual;
    ocupado = true;
    b.disabled = true;
    informar("Revisando los archivos guardados…");
    let revision;
    try {
      revision = await revisar(paradas[actual]);
    } catch (error) {
      informar(error.message, "revisar");
    } finally {
      ocupado = false;
      b.disabled = false;
    }
    if (!revision) return;
    if (!revision.ok) {
      informar(revision.detalle, "revisar");
      return;
    }
    estado.completadas = Math.max(estado.completadas, actual);
    abrir(actual + 1, revision.detalle);
  }

  $("#ancho-amplio").addEventListener("click", () => { if (!ocupado) cambiarAncho(0); });
  $("#ancho-movil").addEventListener("click", () => { if (!ocupado) cambiarAncho(390); });
  $("#actualizar").addEventListener("click", () => {
    if (ocupado) return;
    recargar().then(() => informar("Vista actualizada.")).catch(error => informar(error.message, "revisar"));
  });
  abrir(estado.actual, "", false);
})();
