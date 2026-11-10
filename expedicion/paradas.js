const compilarJava = "javac --release 17 -encoding UTF-8 -d java/out -sourcepath java/src java/src/GenerarReportes.java java/src/PruebaRutas.java";
const paradas = [
  {
    corta: "Antes de empezar",
    titulo: "Antes de empezar",
    area: "Inicio",
    contenido: `
      <p>El Parque Bruma Verde tiene dos rutas al mirador. La guía de visitantes quedó incompleta. Tu equipo va a terminarla para que una persona pueda consultar qué camino está abierto, elegirlo y entender qué pasa si está cerrado.</p>
      <div class="herramientas"><span class="etiqueta">Navegador</span><span class="etiqueta">Editor</span><span class="etiqueta">JDK 17 o superior</span></div>
      <h3>Prepara tu espacio</h3>
      <ol>
        <li>Extrae el ZIP completo. En el editor, abre la carpeta que contiene <code>ABRIR-PRIMERO.html</code>, <code>web/</code> y <code>java/</code>.</li>
        <li>Deja esta página abierta en el navegador. A la derecha o debajo de las instrucciones verás la página que vas construyendo.</li>
        <li>En pareja, una persona edita y la otra predice y comprueba. Cambien de rol al pasar de parada. Si trabajan de a tres, la tercera persona anota qué caso comprobó el equipo.</li>
      </ol>
      <fieldset class="reporte"><legend>Elige el reporte con el que quieres empezar</legend>
        <label><input type="radio" name="equipo" value="A"> A · Llovió</label>
        <label><input type="radio" name="equipo" value="B"> B · El teleférico está en mantenimiento</label>
      </fieldset>
      <p>El proyecto y las pistas ya vienen en la carpeta. Puedes volver a cualquier parada que hayas abierto.</p>`
  },
  {
    corta: "El mapa incompleto",
    titulo: "El mapa incompleto",
    area: "HTML",
    accion: "html",
    contenido: `
      <p>El sendero aparece en la guía. Falta el teleférico, así que hoy el visitante solo puede seleccionar una ruta.</p>
      <h3>En el editor</h3>
      <ol>
        <li>Abre <code>web/index.html</code> y busca <code>PARADA 1</code>, dentro de <code>.rutas</code>.</li>
        <li>Copia la tarjeta del Sendero en ese punto. En la nueva tarjeta escribe <strong>02</strong> y <strong>Teleférico</strong>. Deja <strong>Reporte pendiente</strong> como estado inicial.</li>
        <li>Conserva <code>name="ruta"</code> y cambia <code>value</code> y <code>data-estado-ruta</code> a <code>teleferico</code> en la tarjeta nueva.</li>
      </ol>
      <div class="bloque"><p><strong>Quedó listo si</strong> puedes marcar Sendero y después Teleférico, y solo queda marcada la última opción.</p></div>
      <details><summary>Pista 1 · Qué copiar</summary><p>El bloque de una tarjeta empieza en <code>&lt;label class="tarjeta-ruta"&gt;</code> y termina en <code>&lt;/label&gt;</code>.</p></details>
      <details><summary>Pista 2 · Qué conserva el grupo</summary><p>Los dos radios comparten <code>name="ruta"</code>. Cada uno conserva su propio <code>value</code> y el mismo identificador en el estado de su tarjeta.</p></details>`
  },
  {
    corta: "La visita desde el celular",
    titulo: "La visita desde el celular",
    area: "CSS",
    accion: "css",
    contenido: `
      <p>La guía ya tiene las dos rutas. En un celular, parte de la segunda tarjeta queda por fuera de la pantalla.</p>
      <h3>En el editor</h3>
      <ol>
        <li>Abre <code>web/estilos.css</code> y busca <code>PARADA 2</code>.</li>
        <li>En la regla de móvil que ya está lista, cambia solo el valor de <code>grid-template-columns</code> para que <code>.rutas</code> quede en una columna. La regla de arriba conserva las dos columnas de escritorio.</li>
        <li>Guarda y usa <strong>Recargar vista</strong>. En <strong>Vista móvil</strong>, baja hasta el botón para confirmar que se alcanza con desplazamiento vertical.</li>
      </ol>
      <div class="bloque"><p><strong>Quedó listo si</strong> en móvil lees una tarjeta completa debajo de la otra, sin moverte de lado. En una pantalla amplia quedan en la misma fila.</p></div>
      <div class="referencia-movil" aria-label="Ejemplo de orden en la vista móvil">
        <p>Orden en pantalla estrecha</p><span>Sendero a pie</span><span>Teleférico</span><span>Confirmar mi ruta</span>
      </div>
      <details><summary>Pista 1 · Cuándo cambia el diseño</summary><p>La regla <code>@media</code> del final ya dice cuándo cambia el diseño. El cambio que haces adentro solo afecta las pantallas estrechas.</p></details>
      <details><summary>Pista 2 · Qué propiedad cambia</summary><p>El valor <code>1fr</code> deja una sola columna. Ponlo en la propiedad marcada con <code>PARADA 2</code>.</p></details>`
  },
  {
    corta: "El cuaderno del parque",
    titulo: "El cuaderno del parque",
    area: "Java · POO y List",
    accion: "datos",
    contenido: `
      <p>La pantalla ya se puede usar. Ahora necesita saber si cada ruta abre. La tabla trae los tres reportes. Cada uno tiene dos datos: si llovió y si el teleférico está en mantenimiento.</p>
      <table><thead><tr><th scope="col">Reporte</th><th scope="col">¿Llovió?</th><th scope="col">¿Teleférico en mantenimiento?</th></tr></thead><tbody>
        <tr><th scope="row">A</th><td>Sí</td><td>No</td></tr>
        <tr><th scope="row">B</th><td>No</td><td>Sí</td></tr>
        <tr><th scope="row">C</th><td>Sí</td><td>Sí</td></tr>
      </tbody></table>
      <p><strong>Antes de escribir</strong>, anoten qué ruta abriría con su reporte. El sendero está disponible si no llovió. El teleférico está disponible si no hay mantenimiento.</p>
      <h3>En el editor</h3>
      <ol>
        <li>Abre <code>java/src/Sendero.java</code> y <code>java/src/Teleferico.java</code>. En cada <code>estaDisponible</code>, reemplaza el <code>return true</code> provisional por su regla.</li>
        <li>Abre <code>java/src/RutasDelParque.java</code>. La lista ya está creada. Usa <code>rutas.add(...)</code> dos veces para agregar un <code>Sendero</code> y un <code>Teleferico</code>.</li>
        <li>Desde la carpeta que contiene <code>ABRIR-PRIMERO.html</code>, ejecuta estos dos comandos en orden. <code>GenerarReportes</code> ya está preparado para guardar el resultado.</li>
      </ol>
      <pre><code>${compilarJava}
java -cp java/out GenerarReportes</code></pre>
      <div class="bloque"><p><strong>Quedó listo si</strong> la terminal dice «Reportes A, B y C guardados en web/reportes.js» y las tarjetas muestran su estado al recargar.</p></div>
      <details><summary>Pista 1 · Una regla por ruta</summary><p>Si <code>llovio()</code> devuelve <code>true</code>, ¿qué debe devolver el sendero? La misma pregunta aplica al mantenimiento y al teleférico.</p></details>
      <details><summary>Pista 2 · Dónde mirar</summary><p>Usa <code>reporte.llovio()</code> en el Sendero y <code>reporte.telefericoEnMantenimiento()</code> en el Teleférico. El operador <code>!</code> invierte un booleano. Para registrar la primera ruta, puedes usar <code>rutas.add(new Sendero());</code>.</p></details>
      <details><summary>Ayuda con la terminal</summary><p>Si dice que no encuentra el archivo, abre la terminal en la carpeta extraída que contiene <code>ABRIR-PRIMERO.html</code>. Si no reconoce <code>javac</code>, revisa que estés usando el JDK de tu curso. En IntelliJ también puedes ejecutar <code>GenerarReportes.main</code> con esa carpeta como directorio de trabajo.</p></details>`
  },
  {
    corta: "El camino al mirador",
    titulo: "El camino al mirador",
    area: "JavaScript",
    accion: "interaccion",
    contenido: `
      <p>La guía muestra el estado de las rutas. Falta responder cuando alguien elige una y confirma.</p>
      <h3>En el editor</h3>
      <ol>
        <li>Abre <code>web/app.js</code> y busca <code>PARADA 4</code>, dentro de <code>responderRuta</code>.</li>
        <li>Si <code>ruta.disponible</code> es <code>false</code>, muestra <code>ruta.motivo</code> con <code>mostrarMensaje</code> y termina con <code>return</code>.</li>
        <li>Si está disponible, muestra una confirmación y pon <code>postal.hidden</code> en <code>false</code>.</li>
      </ol>
      <div class="bloque"><p><strong>Quedó listo si</strong> la ruta abierta muestra la postal, y al elegir la cerrada se oculta la postal y aparece el motivo.</p></div>
      <details><summary>Pista 1 · Qué viene del reporte</summary><p>Java ya decidió si una ruta está disponible. El formulario te entrega el objeto de esa ruta. Usa su campo <code>disponible</code>.</p></details>
      <details><summary>Pista 2 · Qué función usar</summary><p><code>mostrarMensaje(ruta.motivo, "aviso")</code> escribe el motivo. La página ya oculta la postal antes de cada intento. Tú decides cuándo volverla a mostrar.</p></details>`
  },
  {
    corta: "Las pruebas del parque",
    titulo: "Las pruebas del parque",
    area: "Java · Pruebas",
    accion: "pruebas",
    contenido: `
      <p>Selecciona <strong>C · Lluvia y mantenimiento</strong> en la vista. Confirma cada ruta. Las dos deben explicar su cierre y la postal debe seguir oculta.</p>
      <h3>Dos casos que se puedan repetir</h3>
      <p>Abre la ficha, explica cómo se compara lo esperado con lo obtenido y aplícalo al Sendero.</p>
      <details><summary>Ficha de consulta · Una comprobación automática</summary><p>Preparas una entrada, decides qué resultado debería producir y ejecutas el método. La comprobación compara el resultado esperado con el obtenido y avisa si son distintos.</p><p>En este proyecto, <code>pruebas.verificar</code> ya hace la comparación. Tu trabajo es construir los casos y entregarle los valores correctos.</p></details>
      <ol>
        <li>Abre <code>java/src/PruebaRutas.java</code> y busca <code>PARADA 5</code>.</li>
        <li>Agrega una llamada a <code>pruebas.verificar</code> para <code>diaSeco</code> con esperado <code>true</code>, y otra para <code>diaLluvioso</code> con esperado <code>false</code>. En ambos casos llama al mismo método del <code>sendero</code> con el reporte correspondiente.</li>
        <li>Compila y ejecuta desde la carpeta extraída. Luego pulsa <strong>Comprobar y continuar</strong>.</li>
      </ol>
      <pre><code>${compilarJava}
java -cp java/out PruebaRutas</code></pre>
      <div class="bloque"><p><strong>Quedó listo si</strong> aparecen dos líneas con <code>OK</code> y puedes explicar por qué la misma ruta abre con un reporte y cierra con el otro.</p></div>
      <details><summary>Pista · Orden de los argumentos</summary><p>En <code>pruebas.verificar(caso, esperado, obtenido)</code> el caso es un nombre de texto, el esperado es un booleano y el obtenido sale de <code>sendero.estaDisponible(...)</code>.</p></details>`
  }
];
