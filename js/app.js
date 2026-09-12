/* L'Uomo di Sansone Pasquale — app.js
   Nastro di scorrimento, insegna, capitoli, targa «Aperto ora», palo del barbiere,
   galleria, recensioni, entrate in pagina, barra in basso, modulo, anno.
   Nessuna libreria, nessuna richiesta di rete, nessun dato salvato. */
(function () {
  "use strict";

  var WA_BASE = "https://wa.me/393894384139?text=";
  var WA_GENERICO = "Buongiorno, vorrei prenotare un taglio. Che giorni avete liberi?";
  var pochiMovimenti = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function waLink(testo) { return WA_BASE + encodeURIComponent(testo); }
  function ognuno(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }

  /* ---------- ORARI: un oggetto solo, fonte e data accanto a ogni riga ---------- */
  var ORARI = {
    // 0 = domenica ... 6 = sabato.
    6: { certo: true, fasce: [["08:00", "17:00"]], dal: "2026-09-12", al: "2026-11-28",
         fonte: "locandina Instagram del 10/09/2026" }
    // Gli altri giorni sono DA CONFERMARE (domande 1-3 al cliente): quando risponde
    // si aggiunge la riga con certo:true e il sito si aggiorna da solo.
  };
  var GIORNI = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];

  /* L'ora di Angri, non quella del telefono. */
  function adessoARoma() {
    var parti = {};
    new Intl.DateTimeFormat("it-IT", {
      timeZone: "Europe/Rome", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date()).forEach(function (p) { parti[p.type] = p.value; });
    return {
      data: parti.year + "-" + parti.month + "-" + parti.day,
      giorno: new Date(Date.UTC(+parti.year, +parti.month - 1, +parti.day)).getUTCDay(),
      minuti: (+parti.hour) * 60 + (+parti.minute)
    };
  }
  function aMinuti(hhmm) { var p = hhmm.split(":"); return (+p[0]) * 60 + (+p[1]); }
  function ora(hhmm) { return hhmm.replace(/^0/, ""); }

  function statoApertura() {
    var t = adessoARoma();
    var riga = ORARI[t.giorno];
    var vale = riga && riga.certo && (!riga.dal || t.data >= riga.dal) && (!riga.al || t.data <= riga.al);
    if (!vale) return { tipo: "ripiego" };
    for (var i = 0; i < riga.fasce.length; i++) {
      var f = riga.fasce[i];
      if (t.minuti >= aMinuti(f[0]) && t.minuti < aMinuti(f[1])) {
        return { tipo: "aperto", testo: "Aperto ora — oggi fino alle " + f[1] };
      }
    }
    var prima = riga.fasce[0];
    if (t.minuti < aMinuti(prima[0])) return { tipo: "chiuso", testo: "Chiuso ora — oggi apriamo alle " + ora(prima[0]) };
    return { tipo: "chiuso", testo: "Chiuso ora — " + GIORNI[t.giorno] + " riapriamo alle " + ora(prima[0]) };
  }

  function targa() {
    var el = document.querySelector("[data-aperto]");
    if (!el) return;
    var s = statoApertura();
    if (s.tipo === "ripiego") return;      /* resta la frase di ripiego scritta nell'HTML */
    el.textContent = "";
    var punto = document.createElement("span");
    punto.className = "targa__punto" + (s.tipo === "chiuso" ? " targa__punto--vuoto" : "");
    punto.setAttribute("aria-hidden", "true");
    el.appendChild(punto);
    el.appendChild(document.createTextNode(s.testo));
  }

  /* ---------- NASTRO DI SCORRIMENTO IN CIMA ---------- */
  function progresso() {
    var barra = document.querySelector(".progresso");
    if (!barra) return;
    var inCoda = false;
    function calcola() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      barra.style.setProperty("--p", h > 0 ? Math.min(window.scrollY / h, 1).toFixed(4) : 0);
      inCoda = false;
    }
    window.addEventListener("scroll", function () {
      if (!inCoda) { inCoda = true; requestAnimationFrame(calcola); }
    }, { passive: true });
    calcola();
  }

  /* ---------- INSEGNA: ombra quando la pagina si muove ---------- */
  function insegna() {
    var h = document.querySelector(".insegna");
    if (!h) return;
    var sentinella = document.createElement("div");
    sentinella.setAttribute("aria-hidden", "true");
    h.parentNode.insertBefore(sentinella, h);
    new IntersectionObserver(function (e) {
      h.classList.toggle("is-scrolled", !e[0].isIntersecting);
    }).observe(sentinella);
  }

  /* ---------- CAPITOLI: segna dove sei ---------- */
  function capitoli() {
    var link = document.querySelectorAll("[data-capitolo]");
    if (!link.length) return;
    var mappa = {};
    var sezioni = [];
    Array.prototype.forEach.call(link, function (a) {
      var id = a.getAttribute("href").split("#")[1];
      var sez = id && document.getElementById(id);
      if (sez) { mappa[id] = a; sezioni.push(sez); }
    });
    if (!sezioni.length) return;
    var io = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (!v.isIntersecting) return;
        Array.prototype.forEach.call(link, function (a) { a.removeAttribute("aria-current"); });
        var a = mappa[v.target.id];
        if (!a) return;
        a.setAttribute("aria-current", "true");
        var nastro = a.parentNode;
        if (nastro && nastro.scrollWidth > nastro.clientWidth) {
          nastro.scrollTo({ left: a.offsetLeft - nastro.clientWidth / 2 + a.offsetWidth / 2,
                            behavior: pochiMovimenti ? "auto" : "smooth" });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sezioni.forEach(function (s) { io.observe(s); });
  }

  /* ---------- PALO E NASTRO: si muovono solo quando si vedono ---------- */
  function animazioniPigre() {
    var el = document.querySelectorAll(".palo, .nastro");
    if (!el.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) { v.target.classList.toggle("is-fermo", !v.isIntersecting); });
    });
    Array.prototype.forEach.call(el, function (x) { io.observe(x); });
  }

  /* ---------- ENTRATE IN PAGINA ---------- */
  function entrate() {
    var el = document.querySelectorAll("[data-reveal]");
    if (!el.length) return;
    if (pochiMovimenti || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(el, function (x) { x.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (!v.isIntersecting) return;
        v.target.classList.add("is-in");
        io.unobserve(v.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    Array.prototype.forEach.call(el, function (x) { io.observe(x); });
  }

  /* ---------- PELLICOLA: frecce da computer ---------- */
  function pellicola() {
    ognuno("[data-pellicola]", function (box) {
      var pista = box.querySelector(".pellicola__pista");
      var prec = box.querySelector("[data-prec]");
      var succ = box.querySelector("[data-succ]");
      if (!pista || !prec || !succ) return;
      function passo() {
        var primo = pista.firstElementChild;
        return primo ? primo.getBoundingClientRect().width + 16 : pista.clientWidth * 0.8;
      }
      function stato() {
        prec.disabled = pista.scrollLeft < 8;
        succ.disabled = pista.scrollLeft + pista.clientWidth > pista.scrollWidth - 8;
      }
      prec.addEventListener("click", function () { pista.scrollBy({ left: -passo(), behavior: pochiMovimenti ? "auto" : "smooth" }); });
      succ.addEventListener("click", function () { pista.scrollBy({ left: passo(), behavior: pochiMovimenti ? "auto" : "smooth" }); });
      pista.addEventListener("scroll", function () { requestAnimationFrame(stato); }, { passive: true });
      window.addEventListener("resize", stato);
      stato();
    });
  }

  /* ---------- VOCI DEI CLIENTI: puntini ---------- */
  function puntini() {
    ognuno("[data-puntini]", function (box) {
      var pista = box.querySelector(".voci-clienti__pista");
      var punti = box.querySelector(".punti");
      if (!pista || !punti) return;
      var schede = pista.children;
      var bottoni = [];
      for (var i = 0; i < schede.length; i++) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "punto";
        b.setAttribute("aria-label", "Vai alla recensione " + (i + 1) + " di " + schede.length);
        (function (n) {
          b.addEventListener("click", function () {
            pista.scrollTo({ left: schede[n].offsetLeft - pista.offsetLeft, behavior: pochiMovimenti ? "auto" : "smooth" });
          });
        })(i);
        punti.appendChild(b);
        bottoni.push(b);
      }
      var io = new IntersectionObserver(function (voci) {
        voci.forEach(function (v) {
          if (!v.isIntersecting) return;
          var n = Array.prototype.indexOf.call(schede, v.target);
          bottoni.forEach(function (b, k) {
            if (k === n) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current");
          });
        });
      }, { root: pista, threshold: 0.6 });
      Array.prototype.forEach.call(schede, function (s) { io.observe(s); });
    });
  }

  /* ---------- BARRA IN BASSO + MESSAGGIO PER SEZIONE ---------- */
  function callbar() {
    var bar = document.querySelector(".callbar");
    var wa = bar && bar.querySelector("[data-wa-bar]");

    /* Si ritira quando gli stessi pulsanti sono gia' a schermo:
       due CTA identiche a pochi centimetri sono un errore, non un rinforzo. */
    if (bar) {
      var visibili = [];
      var obs = new IntersectionObserver(function (voci) {
        voci.forEach(function (v) {
          var i = visibili.indexOf(v.target);
          if (v.isIntersecting && i < 0) visibili.push(v.target);
          else if (!v.isIntersecting && i >= 0) visibili.splice(i, 1);
        });
        var nascondi = visibili.length > 0;
        bar.dataset.hidden = nascondi ? "true" : "false";
        if (nascondi) bar.setAttribute("aria-hidden", "true"); else bar.removeAttribute("aria-hidden");
        ognuno(".callbar a", function (a) {
          if (nascondi) a.setAttribute("tabindex", "-1"); else a.removeAttribute("tabindex");
        });
      }, { threshold: 0.15 });
      ognuno("[data-callbar-ritira]", function (el) { obs.observe(el); });
    }

    if (!wa) return;
    var attiva = null;
    function scrivi(el) { wa.href = waLink((el && el.dataset.wa) || WA_GENERICO); }
    var io = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (v.isIntersecting && v.target !== attiva) { attiva = v.target; scrivi(attiva); }
        else if (!v.isIntersecting && v.target === attiva) { attiva = null; scrivi(null); }
      });
    }, { threshold: 0.5 });
    ognuno("[data-wa]", function (s) { io.observe(s); });
  }

  /* ---------- LINK WHATSAPP DICHIARATIVI ---------- */
  function linkWhatsApp() {
    ognuno("[data-wa-link]", function (a) { a.href = waLink(a.getAttribute("data-wa-link") || WA_GENERICO); });
  }

  /* ---------- MODULO: compone il messaggio, non invia niente ---------- */
  function modulo() {
    var form = document.getElementById("modulo-prenota");
    if (!form) return;
    var campi = {
      nome: form.querySelector("#f-nome"), servizio: form.querySelector("#f-servizio"),
      giorno: form.querySelector("#f-giorno"), note: form.querySelector("#f-note")
    };
    var messaggi = {
      nome: "Scrivi il tuo nome, così sappiamo chi siamo a salutare.",
      servizio: "Scegli cosa vuoi fare, anche «Non lo so ancora».",
      giorno: "Scegli un giorno, oppure «Il prima possibile»."
    };
    function errore(chiave, mostra) {
      var campo = campi[chiave], box = document.getElementById("err-" + chiave);
      if (!box) return;
      box.hidden = !mostra;
      if (mostra) { campo.setAttribute("aria-invalid", "true"); box.querySelector("span").textContent = messaggi[chiave]; }
      else campo.removeAttribute("aria-invalid");
    }
    ["nome", "servizio", "giorno"].forEach(function (k) {
      campi[k].addEventListener("input", function () { if (campi[k].value.trim()) errore(k, false); });
      campi[k].addEventListener("change", function () { if (campi[k].value.trim()) errore(k, false); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var primo = null;
      ["nome", "servizio", "giorno"].forEach(function (k) {
        var vuoto = !campi[k].value.trim();
        errore(k, vuoto);
        if (vuoto && !primo) primo = campi[k];
      });
      if (primo) { primo.focus(); return; }
      var testo = "Buongiorno, sono " + campi.nome.value.trim() +
        ". Vorrei prenotare: " + campi.servizio.value + ". Giorno preferito: " + campi.giorno.value + ".";
      var note = campi.note.value.trim();
      if (note) testo += " " + note;
      window.location.href = waLink(testo);
    });
  }

  function anno() { ognuno("[data-anno]", function (el) { el.textContent = new Date().getFullYear(); }); }

  linkWhatsApp();
  targa();
  progresso();
  insegna();
  capitoli();
  animazioniPigre();
  entrate();
  pellicola();
  puntini();
  callbar();
  modulo();
  anno();
})();
