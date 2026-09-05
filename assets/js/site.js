/* ============================================================
   Altobello Victorio — comportamiento del sitio
   ============================================================ */
(function () {
  "use strict";

  document.documentElement.classList.remove("sin-js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Cabecera: sombra al despegarse del tope ---------- */
  var cabecera = document.querySelector(".cabecera");
  if (cabecera) {
    var ultimoEstado = false;
    var alScroll = function () {
      var flotando = window.scrollY > 8;
      if (flotando !== ultimoEstado) {
        cabecera.classList.toggle("cabecera--flotando", flotando);
        ultimoEstado = flotando;
      }
    };
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
  }

  /* ---------- Menú móvil ---------- */
  var botonMenu = document.querySelector(".hamburguesa");
  var menuMovil = document.querySelector(".menu-movil");
  if (botonMenu && menuMovil) {
    botonMenu.addEventListener("click", function () {
      var abierto = botonMenu.getAttribute("aria-expanded") === "true";
      botonMenu.setAttribute("aria-expanded", String(!abierto));
      menuMovil.dataset.abierto = abierto ? "no" : "si";
    });
  }

  /* ---------- Lista de presupuesto ----------
     El equivalente B2B del carrito: acumula piezas y las manda
     al formulario de presupuesto. Vive en localStorage. */
  var CLAVE = "av_presupuesto";

  function leer() {
    try {
      var crudo = window.localStorage.getItem(CLAVE);
      var datos = crudo ? JSON.parse(crudo) : [];
      return Array.isArray(datos) ? datos : [];
    } catch (e) {
      return [];
    }
  }

  function guardar(lista) {
    try {
      window.localStorage.setItem(CLAVE, JSON.stringify(lista));
    } catch (e) {
      /* Navegación privada o almacenamiento bloqueado: la lista sigue
         funcionando en memoria durante la visita. */
    }
  }

  var lista = leer();

  var contadores = document.querySelectorAll("[data-contador]");
  var panel = document.querySelector(".panel");
  var panelFondo = document.querySelector(".panel-fondo");
  var panelLista = document.querySelector(".panel__lista");
  var aviso = document.querySelector(".aviso");
  var tempAviso;

  function mostrarAviso(texto) {
    if (!aviso) return;
    aviso.textContent = texto;
    aviso.dataset.visible = "si";
    window.clearTimeout(tempAviso);
    tempAviso = window.setTimeout(function () {
      aviso.dataset.visible = "no";
    }, 2600);
  }

  var contadorPrevio = lista.length;

  function pintarContador(conPulso) {
    contadores.forEach(function (c) {
      c.textContent = String(lista.length);
      c.dataset.vacio = lista.length === 0 ? "si" : "no";

      /* Un pulso corto confirma que el click se registró. Va con WAAPI
         y no con keyframes CSS porque el botón se puede apretar dos
         veces por segundo: element.animate() reinicia limpio cada vez. */
      if (conPulso && !reduceMotion && typeof c.animate === "function") {
        c.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.28)" },
            { transform: "scale(1)" }
          ],
          { duration: 240, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
        );
      }
    });
    contadorPrevio = lista.length;
  }

  function pintarPanel() {
    if (!panelLista) return;
    panelLista.innerHTML = "";

    if (lista.length === 0) {
      var vacio = document.createElement("p");
      vacio.className = "panel__vacio";
      vacio.textContent = "Todavía no sumaste piezas. Agregá lo que te interese desde el catálogo y te pasamos un presupuesto por el conjunto.";
      panelLista.appendChild(vacio);
      return;
    }

    lista.forEach(function (pieza, i) {
      var fila = document.createElement("div");
      fila.className = "item";

      var foto = document.createElement("div");
      foto.className = "foto item__foto " + (pieza.tono || "foto--roble");
      if (pieza.img) foto.style.backgroundImage = "url('" + pieza.img + "')";

      var medio = document.createElement("div");
      var nombre = document.createElement("div");
      nombre.className = "item__nombre";
      nombre.textContent = pieza.nombre;
      var codigo = document.createElement("div");
      codigo.className = "item__codigo";
      codigo.textContent = pieza.codigo;
      medio.appendChild(nombre);
      medio.appendChild(codigo);

      var quitar = document.createElement("button");
      quitar.className = "item__quitar";
      quitar.type = "button";
      quitar.setAttribute("aria-label", "Quitar " + pieza.nombre + " de la lista");
      quitar.textContent = "×";
      quitar.addEventListener("click", function () {
        function aplicar() {
          lista.splice(i, 1);
          guardar(lista);
          pintarContador();
          pintarPanel();
          pintarResumen();
          sincronizarBotones();
          mostrarAviso("Se quitó " + pieza.nombre + ".");
        }

        if (reduceMotion) { aplicar(); return; }

        /* La fila se va primero, hacia el lado del botón que la quitó;
           recién después se rearma la lista, para que las de abajo no
           salten mientras el ojo todavía está en la que desaparece. */
        fila.dataset.saliendo = "si";
        quitar.disabled = true;
        window.setTimeout(aplicar, 180);
      });

      fila.appendChild(foto);
      fila.appendChild(medio);
      fila.appendChild(quitar);
      panelLista.appendChild(fila);
    });
  }

  function pintarResumen() {
    var resumen = document.querySelector("[data-resumen-lista]");
    if (!resumen) return;
    resumen.textContent = lista.length === 0
      ? "No sumaste piezas todavía — contanos abajo qué necesitás."
      : lista.length + " pieza" + (lista.length === 1 ? "" : "s") + " en tu lista: " +
        lista.map(function (p) { return p.nombre; }).join(", ") + ".";
  }

  function sincronizarBotones() {
    document.querySelectorAll("[data-sumar]").forEach(function (boton) {
      var codigo = boton.dataset.codigo;
      var dentro = lista.some(function (p) { return p.codigo === codigo; });
      boton.dataset.agregado = dentro ? "si" : "no";
      var etiqueta = boton.querySelector("[data-etiqueta]");
      if (etiqueta) etiqueta.textContent = dentro ? "En la lista" : "Presupuestar";
    });
  }

  document.querySelectorAll("[data-sumar]").forEach(function (boton) {
    boton.addEventListener("click", function () {
      var codigo = boton.dataset.codigo;
      var yaEsta = lista.some(function (p) { return p.codigo === codigo; });

      if (yaEsta) {
        lista = lista.filter(function (p) { return p.codigo !== codigo; });
        mostrarAviso("Se quitó de la lista.");
      } else {
        lista.push({
          codigo: codigo,
          nombre: boton.dataset.nombre,
          img: boton.dataset.img || "",
          tono: boton.dataset.tono || "foto--roble"
        });
        mostrarAviso(boton.dataset.nombre + " se sumó al presupuesto.");
      }

      guardar(lista);
      pintarContador(true);
      pintarPanel();
      pintarResumen();
      sincronizarBotones();
    });
  });

  /* ---------- Apertura y cierre del panel ---------- */
  var ultimoFoco = null;

  function abrirPanel() {
    if (!panel) return;
    ultimoFoco = document.activeElement;
    panel.dataset.abierto = "si";
    panel.setAttribute("aria-hidden", "false");
    if (panelFondo) panelFondo.dataset.abierto = "si";
    var primero = panel.querySelector("button, a");
    if (primero) primero.focus();
  }

  function cerrarPanel() {
    if (!panel) return;
    panel.dataset.abierto = "no";
    panel.setAttribute("aria-hidden", "true");
    if (panelFondo) panelFondo.dataset.abierto = "no";
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }

  document.querySelectorAll("[data-abrir-panel]").forEach(function (b) {
    b.addEventListener("click", abrirPanel);
  });
  document.querySelectorAll("[data-cerrar-panel]").forEach(function (b) {
    b.addEventListener("click", cerrarPanel);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel && panel.dataset.abierto === "si") cerrarPanel();
  });

  pintarContador();
  pintarPanel();
  pintarResumen();
  sincronizarBotones();

  /* ---------- Logo real ----------
     El isotipo dibujado en SVG es una aproximación hecha a ojo desde una
     imagen. Si alguien deja el archivo de marca en assets/img/, el sitio
     lo usa en lugar del dibujo: logo.svg para la cabecera y
     logo-blanco.svg para el pie, que va sobre fondo oscuro.
     Acepta .svg o .png, en ese orden. */
  (function () {
    document.querySelectorAll("[data-marca]").forEach(function (marca) {
      var base = marca.dataset.marca === "claro" ? "logo-blanco" : "logo";
      var formatos = ["svg", "png"];

      (function probar(i) {
        if (i >= formatos.length) return;
        var ruta = "assets/img/" + base + "." + formatos[i];
        var sonda = new Image();
        sonda.onload = function () {
          var img = document.createElement("img");
          img.src = ruta;
          img.alt = "Altobello Victorio, muebles para oficina";
          img.className = "marca__logo";
          marca.replaceChildren(img);
        };
        sonda.onerror = function () { probar(i + 1); };
        sonda.src = ruta;
      })(0);
    });
  })();

  /* ---------- Slots de imagen ----------
     Cada .foto declara su archivo en data-img. Probamos si existe:
     si carga, se pinta de fondo y desaparece el rótulo de reemplazo;
     si no, queda el bloque de color con el nombre del archivo que
     falta. Nunca se ve un ícono de imagen rota. */
  document.querySelectorAll(".foto[data-img]").forEach(function (slot) {
    var ruta = slot.dataset.img;
    if (!ruta) return;
    var sonda = new Image();
    sonda.onload = function () {
      slot.style.backgroundImage = "url('" + ruta + "')";
      slot.dataset.cargada = "si";

      var rotulo = slot.querySelector(".foto__marca-agua");
      if (!rotulo) return;
      if (reduceMotion) { rotulo.remove(); return; }
      rotulo.dataset.saliendo = "si";
      window.setTimeout(function () { rotulo.remove(); }, 240);
    };
    sonda.src = ruta;
  });

  /* ---------- Revelado al entrar en pantalla ----------
     Escalonado por fila, no por elemento suelto: el ojo lee una
     banda que aparece, no quince cosas parpadeando. */
  var aRevelar = document.querySelectorAll(".revelar");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    aRevelar.forEach(function (el) { el.dataset.visto = "si"; });
  } else {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.dataset.visto = "si";
        observador.unobserve(entrada.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

    aRevelar.forEach(function (el, i) {
      var grupo = el.closest("[data-escalonar]");
      if (grupo) {
        var hermanos = Array.prototype.slice.call(grupo.querySelectorAll(".revelar"));
        el.style.setProperty("--retraso", (hermanos.indexOf(el) * 70) + "ms");
      }
      observador.observe(el);
    });
  }

  /* ---------- Filtros del catálogo ---------- */
  var filtros = document.querySelectorAll("[data-filtro]");
  var piezas = document.querySelectorAll("[data-categoria]");
  var salidaConteo = document.querySelector("[data-conteo]");

  /* Cada pasada lleva un número. Si alguien toca otra casilla antes de
     que termine la anterior, la vieja se descarta en lugar de ocultar
     una pieza que ya volvió a estar visible. */
  var pasada = 0;

  function ocultar(pieza, mia) {
    pieza.dataset.saliendo = "si";
    window.setTimeout(function () {
      if (pasada !== mia) return;
      pieza.hidden = true;
      delete pieza.dataset.saliendo;
    }, 150);
  }

  function aparecer(pieza, orden) {
    delete pieza.dataset.saliendo;
    pieza.hidden = false;
    pieza.dataset.entrando = "si";
    pieza.style.setProperty("--retraso-entrada", (orden * 40) + "ms");

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        delete pieza.dataset.entrando;
        window.setTimeout(function () {
          pieza.style.removeProperty("--retraso-entrada");
        }, 200 + orden * 40);
      });
    });
  }

  function aplicarFiltros() {
    var activas = [];
    filtros.forEach(function (f) { if (f.checked) activas.push(f.value); });

    var grilla = document.querySelector(".rejilla-prod");
    if (grilla) grilla.dataset.filtrando = "si";

    pasada++;
    var mia = pasada;
    var visibles = 0;
    var entrando = 0;

    piezas.forEach(function (pieza) {
      var cat = pieza.dataset.categoria;
      var mostrar = activas.length === 0 || activas.indexOf(cat) !== -1;
      if (mostrar) visibles++;

      if (reduceMotion) {
        delete pieza.dataset.saliendo;
        delete pieza.dataset.entrando;
        pieza.hidden = !mostrar;
        return;
      }

      var oculta = pieza.hidden;
      if (mostrar && (oculta || pieza.dataset.saliendo)) {
        aparecer(pieza, entrando++);
      } else if (!mostrar && !oculta) {
        ocultar(pieza, mia);
      }
    });

    if (salidaConteo) {
      salidaConteo.textContent = visibles === piezas.length
        ? "Mostrando las " + piezas.length + " piezas"
        : "Mostrando " + visibles + " de " + piezas.length + " piezas";
    }
  }

  filtros.forEach(function (f) { f.addEventListener("change", aplicarFiltros); });

  var limpiar = document.querySelector("[data-limpiar]");
  if (limpiar) {
    limpiar.addEventListener("click", function () {
      filtros.forEach(function (f) { f.checked = false; });
      aplicarFiltros();
    });
  }

  /* ---------- Formulario de presupuesto ---------- */
  var form = document.querySelector("[data-form-presupuesto]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var estado = form.querySelector("[data-estado-form]");
      if (estado) {
        estado.hidden = false;
        if (!reduceMotion) {
          estado.dataset.entrando = "si";
          window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
              delete estado.dataset.entrando;
            });
          });
        }
        estado.textContent = "Listo. Es una maqueta de demostración, así que no se envió nada — en la web real esto llega a presupuestos@altobellovictorio.com.ar.";
        estado.focus();
      }
    });
  }
})();
