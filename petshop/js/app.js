(function () {
  "use strict";

  var CFG = window.SHOP_CONFIG || {};
  var FREE_SHIP = CFG.freeShipFrom || 500000;   // VND
  var SHIP_FEE = CFG.shipFee || 0;              // VND
  var CART_KEY = "amyspets.cart";
  var LANG_KEY = "amyspets.lang";
  var CUSTOMER_KEY = "amyspets.customer";
  var PET_IMG = { dog: "img/pet-dog.jpg", cat: "img/pet-cat.jpg", small: "img/pet-small.jpg", fish: "img/pet-fish.jpg", bird: "img/pet-bird.jpg" };

  var $ = function (s) { return document.querySelector(s); };
  var byId = {};
  PRODUCTS.forEach(function (p) { byId[p.id] = p; });

  // ---------- estado ----------
  var state = { lang: load(LANG_KEY, null) || guessLang(), pet: "all", type: "all", q: "", sort: "pop" };
  var cart = load(CART_KEY, {});        // { productId: qty }
  Object.keys(cart).forEach(function (id) { if (!byId[id] || !(cart[id] > 0)) delete cart[id]; });

  function guessLang() { return (navigator.language || "").toLowerCase().indexOf("vi") === 0 ? "vi" : "en"; }
  function load(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  function T() { return I18N[state.lang]; }
  function money(n) {
    return new Intl.NumberFormat(T().locale, { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function stars(r) {
    var full = Math.round(r);
    return '<span class="stars" aria-label="' + r + '/5">' + "★★★★★".slice(0, full) + '<span class="stars__off">' + "★★★★★".slice(full) + "</span></span>";
  }
  function norm(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d"); }

  // ---------- textos estáticos ----------
  function applyStatic() {
    var t = T();
    document.documentElement.lang = t.htmlLang;
    document.title = t.title;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t[el.dataset.i18n]; });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.placeholder = t[el.dataset.i18nPh]; });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t[el.dataset.i18nAria]); });
    document.querySelectorAll("[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.lang === state.lang); });

    $("#perks").innerHTML = t.perks.map(function (p) {
      return '<div class="perk"><span class="perk__icon" aria-hidden="true">' + p[0] + "</span><div><strong>" + p[1] + "</strong><span>" + p[2] + "</span></div></div>";
    }).join("");

    $("#sort").innerHTML = Object.keys(t.sorts).map(function (k) {
      return '<option value="' + k + '"' + (k === state.sort ? " selected" : "") + ">" + t.sorts[k] + "</option>";
    }).join("");
  }

  // ---------- categorías ----------
  function renderPets() {
    var t = T();
    var keys = ["all", "dog", "cat", "small", "fish", "bird"];
    $("#pets").innerHTML = keys.map(function (k) {
      var img = k === "all" ? "img/cat-dog.jpg" : PET_IMG[k];
      return '<button type="button" class="pet' + (state.pet === k ? " is-active" : "") + '" data-pet="' + k + '" aria-pressed="' + (state.pet === k) + '">' +
        '<img src="' + img + '" alt="" loading="lazy"><span>' + t.pets[k] + "</span></button>";
    }).join("");
  }

  function renderChips() {
    var t = T();
    $("#typeChips").innerHTML = Object.keys(t.types).map(function (k) {
      return '<button type="button" class="chip' + (state.type === k ? " is-active" : "") + '" data-type="' + k + '" aria-pressed="' + (state.type === k) + '">' + t.types[k] + "</button>";
    }).join("");
  }

  // ---------- catálogo ----------
  function filtered() {
    var q = norm(state.q.trim());
    var list = PRODUCTS.filter(function (p) {
      if (state.pet !== "all" && p.pet !== state.pet) return false;
      if (state.type !== "all" && p.type !== state.type) return false;
      if (!q) return true;
      var hay = norm([p.name.vi, p.name.en, p.brand, I18N.vi.types[p.type], I18N.en.types[p.type], I18N.vi.pets[p.pet], I18N.en.pets[p.pet]].join(" "));
      return q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
    });
    var s = {
      pop: function (a, b) { return b.reviews - a.reviews; },
      priceAsc: function (a, b) { return a.price - b.price; },
      priceDesc: function (a, b) { return b.price - a.price; },
      rating: function (a, b) { return b.rating - a.rating || b.reviews - a.reviews; }
    }[state.sort];
    return list.slice().sort(s);
  }

  function card(p) {
    var t = T(), l = state.lang;
    return '<article class="card">' +
      '<button type="button" class="card__media" data-open="' + p.id + '" aria-label="' + esc(p.name[l]) + '">' +
        '<img src="' + p.img + '" alt="' + esc(p.name[l]) + '" loading="lazy">' +
        (p.badge ? '<span class="badge badge--' + p.badge + '">' + t.badges[p.badge] + "</span>" : "") +
      "</button>" +
      '<div class="card__body">' +
        '<p class="card__brand">' + esc(p.brand) + "</p>" +
        '<h3 class="card__name"><button type="button" data-open="' + p.id + '">' + esc(p.name[l]) + "</button></h3>" +
        '<p class="card__rating">' + stars(p.rating) + ' <span class="muted">' + p.rating.toFixed(1) + " (" + p.reviews + ")</span></p>" +
        '<p class="price">' + money(p.price) + (p.old ? ' <s>' + money(p.old) + "</s>" : "") + "</p>" +
        '<button type="button" class="btn btn--primary btn--block" data-add="' + p.id + '">' + t.add + "</button>" +
      "</div></article>";
  }

  function renderGrid() {
    var list = filtered();
    $("#grid").innerHTML = list.map(card).join("");
    $("#resultCount").textContent = T().results(list.length);
    $("#empty").hidden = list.length > 0;
  }

  // ---------- ficha ----------
  var modalQty = 1, modalId = null;
  function openProduct(id) {
    var p = byId[id]; if (!p) return;
    modalId = id; modalQty = 1;
    renderProduct();
    var m = $("#productModal");
    if (typeof m.showModal === "function") m.showModal(); else m.setAttribute("open", "");
  }
  function renderProduct() {
    var p = byId[modalId], t = T(), l = state.lang;
    $("#productBody").innerHTML =
      '<button type="button" class="icon-btn modal__close" data-close aria-label="' + t.close + '">✕</button>' +
      '<img class="modal__img" src="' + p.img + '" alt="' + esc(p.name[l]) + '">' +
      '<div class="modal__info">' +
        '<p class="card__brand">' + esc(p.brand) + " · " + t.pets[p.pet] + " · " + t.types[p.type] + "</p>" +
        "<h2>" + esc(p.name[l]) + "</h2>" +
        '<p class="card__rating">' + stars(p.rating) + ' <span class="muted">' + p.rating.toFixed(1) + " · " + t.reviews(p.reviews) + "</span></p>" +
        '<p class="price price--lg">' + money(p.price) + (p.old ? " <s>" + money(p.old) + "</s>" : "") + "</p>" +
        "<p>" + esc(p.desc[l]) + "</p>" +
        '<div class="buy-row">' +
          '<div class="qty" role="group" aria-label="' + t.qty + '">' +
            '<button type="button" data-mq="-1" aria-label="−">−</button><span id="mqty">' + modalQty + '</span><button type="button" data-mq="1" aria-label="+">+</button>' +
          "</div>" +
          '<button type="button" class="btn btn--primary" data-add-modal>' + t.add + "</button>" +
        "</div>" +
      "</div>";
  }
  function closeProduct() { var m = $("#productModal"); if (m.open) { if (m.close) m.close(); else m.removeAttribute("open"); } }

  // ---------- carrito ----------
  function cartCount() { return Object.keys(cart).reduce(function (s, id) { return s + cart[id]; }, 0); }
  function subtotal() { return Object.keys(cart).reduce(function (s, id) { return s + byId[id].price * cart[id]; }, 0); }

  function addToCart(id, n) {
    cart[id] = Math.min(99, (cart[id] || 0) + (n || 1));
    commit();
    toast(T().toastAdded(byId[id].name[state.lang]));
    var c = $("#cartCount"); c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
  }
  function setQty(id, q) { if (q <= 0) delete cart[id]; else cart[id] = Math.min(99, q); commit(); }
  function commit() { save(CART_KEY, cart); renderCart(); }

  function shipping() { return subtotal() >= FREE_SHIP ? 0 : SHIP_FEE; }

  // ---------- pedido (contra entrega por Zalo / WhatsApp) ----------
  var view = "cart";                      // cart | checkout | done
  var customer = load(CUSTOMER_KEY, {}) || {};
  var FIELDS = ["name", "phone", "address", "city", "note"];
  FIELDS.forEach(function (f) { if (typeof customer[f] !== "string") customer[f] = ""; });
  var errors = {};
  var order = null;                       // { code, channel, text }

  function cleanPhone(s) { return s.replace(/[\s.\-()]/g, ""); }
  function validPhone(s) { return /^(0|\+?84)(3|5|7|8|9)\d{8}$/.test(cleanPhone(s)); }
  function validate() {
    var t = T(); errors = {};
    if (customer.name.trim().length < 2) errors.name = t.errName;
    if (!validPhone(customer.phone)) errors.phone = t.errPhone;
    if (customer.address.trim().length < 5) errors.address = t.errAddress;
    if (customer.city.trim().length < 2) errors.city = t.errCity;
    return !Object.keys(errors).length;
  }
  function newCode() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, "0"); };
    return "AP" + String(d.getFullYear()).slice(2) + p(d.getMonth() + 1) + p(d.getDate()) + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
  }
  function orderText(code) {
    var t = T(), l = state.lang, sub = subtotal(), ship = shipping();
    var lines = [t.msgHello, "", t.msgCode + ": " + code, ""];
    Object.keys(cart).forEach(function (id, i) {
      var p = byId[id];
      lines.push((i + 1) + ". " + p.name[l] + " [" + id.toUpperCase() + "] × " + cart[id] + " = " + money(p.price * cart[id]));
    });
    lines.push("", t.subtotal + ": " + money(sub),
      t.shipping + ": " + (ship ? money(ship) : t.shipFree),
      t.total + ": " + money(sub + ship),
      t.msgPay, "",
      t.msgName + ": " + customer.name.trim(),
      t.msgPhone + ": " + cleanPhone(customer.phone),
      t.msgAddress + ": " + customer.address.trim() + ", " + customer.city.trim());
    if (customer.note.trim()) lines.push(t.msgNote + ": " + customer.note.trim());
    return lines.join("\n");
  }
  function channelUrl(channel, text) {
    return channel === "wa"
      ? "https://wa.me/" + String(CFG.whatsappPhone || "").replace(/\D/g, "") + "?text=" + encodeURIComponent(text)
      : "https://zalo.me/" + String(CFG.zaloPhone || "").replace(/\D/g, "");
  }
  function copyText(text) {
    var fallback = function () {
      var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta); return Promise.resolve(ok);
    };
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).then(function () { return true; }, fallback);
    return fallback();
  }
  // Los botones de envío son enlaces <a> reales: así abren Zalo/WhatsApp también donde
  // window.open está bloqueado. Si el formulario no es válido se cancela la navegación.
  function sendOrder(channel, link, ev) {
    if (!validate()) { ev.preventDefault(); renderCart(); var bad = document.querySelector(".field.has-error input, .field.has-error textarea"); if (bad) bad.focus(); return; }
    save(CUSTOMER_KEY, customer);
    var code = order && order.code ? order.code : newCode();
    var text = orderText(code);
    order = { code: code, channel: channel, text: text, copied: false };
    if (channel === "zalo") copyText(text).then(function (ok) {
      order.copied = ok;
      if (ok) { toast(T().zaloCopied); if (view === "done") renderCart(); }
    });
    link.href = channelUrl(channel, text);          // el navegador sigue este enlace tras el clic
    setTimeout(function () { view = "done"; renderCart(); }, 0);
  }

  function field(f, label, type, extra) {
    var err = errors[f];
    var input = type === "textarea"
      ? '<textarea id="f-' + f + '" data-field="' + f + '" rows="2" placeholder="' + esc(extra || "") + '">' + esc(customer[f]) + "</textarea>"
      : '<input id="f-' + f + '" data-field="' + f + '" type="' + type + '" value="' + esc(customer[f]) + '"' + (extra || "") + (err ? ' aria-invalid="true" aria-describedby="e-' + f + '"' : "") + ">";
    return '<div class="field' + (err ? " has-error" : "") + '"><label for="f-' + f + '">' + label + "</label>" + input +
      (err ? '<p class="field__err" id="e-' + f + '">' + err + "</p>" : "") + "</div>";
  }

  function totalsHtml() {
    var t = T(), sub = subtotal(), ship = shipping();
    return '<div class="sum"><span>' + t.subtotal + "</span><span>" + money(sub) + "</span></div>" +
      '<div class="sum"><span>' + t.shipping + "</span><span>" + (ship ? money(ship) : t.shipFree) + "</span></div>" +
      '<div class="sum sum--total"><span>' + t.total + "</span><span>" + money(sub + ship) + "</span></div>";
  }

  function renderCheckout() {
    var t = T(), l = state.lang;
    $("#drawerTitle").textContent = t.coTitle;
    $("#shipBar").innerHTML = '<button type="button" class="link link--back" data-view="cart">' + t.back + "</button>";
    $("#cartItems").innerHTML =
      '<form class="co" id="coForm" novalidate>' +
        field("name", t.fName, "text", ' autocomplete="name"') +
        field("phone", t.fPhone, "tel", ' autocomplete="tel" inputmode="tel" placeholder="0912 345 678"') +
        field("address", t.fAddress, "text", ' autocomplete="street-address"') +
        field("city", t.fCity, "text", ' autocomplete="address-level1" list="cities"') +
        '<datalist id="cities"><option value="TP. Hồ Chí Minh"><option value="Hà Nội"><option value="Đà Nẵng"><option value="Hải Phòng"><option value="Cần Thơ"></datalist>' +
        field("note", t.fNote, "textarea", t.notePh) +
        '<fieldset class="pay"><legend>' + t.payTitle + "</legend>" +
          '<label class="pay__opt"><input type="radio" name="pay" checked> <span><strong>💵 ' + t.cod + "</strong><small>" + t.codHint + "</small></span></label>" +
        "</fieldset>" +
        '<div class="mini">' + Object.keys(cart).map(function (id) {
          var p = byId[id];
          return '<div class="mini__row"><span>' + esc(p.name[l]) + " × " + cart[id] + "</span><span>" + money(p.price * cart[id]) + "</span></div>";
        }).join("") + "</div>" +
      "</form>";
    $("#cartFoot").innerHTML = totalsHtml() +
      '<p class="send-label">' + t.sendVia + "</p>" +
      '<div class="send">' +
        '<a class="btn btn--zalo" data-send="zalo" href="' + esc(channelUrl("zalo", "")) + '" target="_blank" rel="noopener"><span class="send__ico" aria-hidden="true">Z</span> Zalo</a>' +
        '<a class="btn btn--wa" data-send="wa" href="' + esc(channelUrl("wa", "")) + '" target="_blank" rel="noopener"><span class="send__ico" aria-hidden="true">✆</span> WhatsApp</a>' +
      "</div>";
  }

  function renderDone() {
    var t = T();
    if (Object.keys(cart).length) order.text = orderText(order.code);   // sigue el idioma actual
    $("#drawerTitle").textContent = t.doneTitle;
    $("#shipBar").innerHTML = "";
    $("#cartItems").innerHTML =
      '<div class="done">' +
        '<p class="done__icon done__icon--' + order.channel + '" aria-hidden="true">' + (order.channel === "wa" ? "✆" : "Z") + "</p>" +
        "<p><strong>" + (order.channel === "wa" ? t.doneWa : order.copied ? t.doneZalo : t.doneZaloManual) + "</strong></p>" +
        '<p class="done__code">' + t.doneCode(order.code) + "</p>" +
        '<p class="muted">' + t.doneCall + "</p>" +
        '<label class="done__label" for="orderText">' + t.orderText + "</label>" +
        '<textarea id="orderText" class="done__text" readonly rows="10">' + esc(order.text) + "</textarea>" +
        '<div class="done__row">' +
          '<button type="button" class="btn" data-copy>' + t.copy + "</button>" +
          '<a class="btn ' + (order.channel === "wa" ? "btn--wa" : "btn--zalo") + '" href="' + esc(channelUrl(order.channel, order.text)) + '" target="_blank" rel="noopener">' + t.openAgain + "</a>" +
        "</div>" +
      "</div>";
    $("#cartFoot").innerHTML =
      '<button type="button" class="btn btn--primary btn--block" data-finish>' + t.finish + "</button>" +
      '<button type="button" class="link" data-view="checkout">' + t.edit + "</button>";
  }

  function renderCart() {
    var t = T(), l = state.lang, ids = Object.keys(cart), sub = subtotal();
    $("#cartCount").textContent = cartCount();
    if (!ids.length && view === "checkout") view = "cart";
    if (view === "checkout") return renderCheckout();
    if (view === "done" && order) return renderDone();
    view = "cart";
    $("#drawerTitle").textContent = t.cart;

    var pct = Math.min(100, Math.round(sub / FREE_SHIP * 100));
    $("#shipBar").innerHTML = ids.length ? '<p>' + (sub >= FREE_SHIP ? t.gotFree : t.toFree(money(FREE_SHIP - sub))) + '</p><div class="bar"><span style="width:' + pct + '%"></span></div>' : "";

    $("#cartItems").innerHTML = ids.length ? ids.map(function (id) {
      var p = byId[id];
      return '<div class="line">' +
        '<img src="' + p.img + '" alt="">' +
        '<div class="line__info"><p class="line__name">' + esc(p.name[l]) + '</p><p class="muted">' + money(p.price) + "</p>" +
          '<div class="qty qty--sm" role="group" aria-label="' + t.qty + '">' +
            '<button type="button" data-q="' + id + '" data-d="-1" aria-label="−">−</button><span>' + cart[id] + '</span><button type="button" data-q="' + id + '" data-d="1" aria-label="+">+</button>' +
          "</div></div>" +
        '<div class="line__end"><strong>' + money(p.price * cart[id]) + '</strong><button type="button" class="link" data-rm="' + id + '">' + t.remove + "</button></div>" +
      "</div>";
    }).join("") : '<div class="drawer__empty"><p>🐶🛒</p><p>' + t.cartEmpty + '</p><button type="button" class="btn" data-close-cart>' + t.keepShopping + "</button></div>";

    $("#cartFoot").innerHTML = ids.length ?
      totalsHtml() +
      '<button type="button" class="btn btn--primary btn--block" data-view="checkout">' + t.checkout + "</button>" +
      '<p class="muted small">' + t.checkoutNote + "</p>" +
      '<button type="button" class="link" data-empty>' + t.emptyCart + "</button>" : "";
  }

  var lastFocus = null;
  function openCart() {
    lastFocus = document.activeElement;
    $("#drawer").classList.add("is-open"); $("#drawer").setAttribute("aria-hidden", "false");
    $("#overlay").hidden = false; document.body.classList.add("no-scroll");
    $("#closeCart").focus();
  }
  function closeCart() {
    $("#drawer").classList.remove("is-open"); $("#drawer").setAttribute("aria-hidden", "true");
    $("#overlay").hidden = true; document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }

  var toastTimer;
  function toast(msg) {
    var el = $("#toast"); el.textContent = msg; el.classList.add("is-on");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove("is-on"); }, 2200);
  }

  // ---------- render global ----------
  function renderAll() { applyStatic(); renderPets(); renderChips(); renderGrid(); renderCart(); if (modalId && $("#productModal").open) renderProduct(); }

  // ---------- eventos ----------
  document.addEventListener("click", function (e) {
    var el = e.target.closest("button, a"); if (!el) return;
    var d = el.dataset;
    if (d.lang) { state.lang = d.lang; save(LANG_KEY, d.lang); renderAll(); }
    else if (d.pet) { state.pet = d.pet; renderPets(); renderGrid(); }
    else if (d.type) { state.type = d.type; renderChips(); renderGrid(); }
    else if (d.add) { addToCart(d.add, 1); el.textContent = T().added + " ✓"; setTimeout(function () { el.textContent = T().add; }, 1200); }
    else if (d.open) openProduct(d.open);
    else if (d.mq) { modalQty = Math.max(1, Math.min(99, modalQty + Number(d.mq))); $("#mqty").textContent = modalQty; }
    else if ("addModal" in d) { addToCart(modalId, modalQty); closeProduct(); }
    else if ("close" in d) closeProduct();
    else if (d.q) setQty(d.q, cart[d.q] + Number(d.d));
    else if (d.rm) setQty(d.rm, 0);
    else if ("empty" in d) {
      // confirmación en dos toques, sin confirm() (no funciona en todos los navegadores/vistas)
      if (el.dataset.armed) { cart = {}; commit(); }
      else { el.dataset.armed = "1"; el.textContent = T().confirmEmpty; el.classList.add("is-armed");
             setTimeout(function () { if (el.isConnected) { delete el.dataset.armed; el.textContent = T().emptyCart; el.classList.remove("is-armed"); } }, 3000); }
    }
    else if ("closeCart" in d) closeCart();
    else if (d.view) {
      if (d.view === "checkout" && view === "cart") order = null;   // pedido nuevo → código nuevo
      view = d.view; errors = {}; renderCart();
      var first = d.view === "checkout" ? $("#f-name") : null; if (first && !customer.name) first.focus();
      $("#cartItems").scrollTop = 0;
    }
    else if (d.send) sendOrder(d.send, el, e);
    else if ("copy" in d) copyText(order.text).then(function (ok) { if (ok) { el.textContent = T().copied; setTimeout(function () { el.textContent = T().copy; }, 1500); } else { $("#orderText").select(); } });
    else if ("finish" in d) { cart = {}; order = null; view = "cart"; commit(); closeCart(); }
  });
  // el formulario guarda lo que se escribe (no se pierde al cambiar de idioma)
  document.addEventListener("input", function (e) {
    var f = e.target.dataset && e.target.dataset.field; if (!f) return;
    customer[f] = e.target.value;
    if (errors[f]) { delete errors[f]; var box = e.target.closest(".field"); box.classList.remove("has-error"); var m = box.querySelector(".field__err"); if (m) m.remove(); e.target.removeAttribute("aria-invalid"); }
  });
  document.addEventListener("submit", function (e) { e.preventDefault(); });
  $("#openCart").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  $("#overlay").addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && $("#drawer").classList.contains("is-open")) closeCart(); });
  $("#productModal").addEventListener("click", function (e) { if (e.target === this) closeProduct(); });

  $("#search").addEventListener("input", function (e) { state.q = e.target.value; renderGrid(); });
  $("#search").addEventListener("keydown", function (e) { if (e.key === "Enter") $("#shop").scrollIntoView({ behavior: "smooth" }); });
  $("#sort").addEventListener("change", function (e) { state.sort = e.target.value; renderGrid(); });
  $("#clearFilters").addEventListener("click", function () {
    state.pet = "all"; state.type = "all"; state.q = ""; $("#search").value = "";
    renderPets(); renderChips(); renderGrid();
  });
  $("#pets").addEventListener("click", function (e) { if (e.target.closest("[data-pet]")) $("#shop").scrollIntoView({ behavior: "smooth" }); });

  // sincroniza el carrito entre pestañas
  window.addEventListener("storage", function (e) { if (e.key === CART_KEY) { cart = load(CART_KEY, {}); renderCart(); } });

  renderAll();
})();
