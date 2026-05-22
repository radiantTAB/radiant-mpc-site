/* customer-login.js — site-wide Customer Login / Logout control.
 *
 * Injected into every Radiant marketing page by the Worker. Adds a
 * session-aware control next to the logo: a "Customer Login" button that
 * opens a sign-in modal, or — when signed in — the client's name and a
 * "Log out" button. Uses the existing portal API (/portal/api/*); the
 * portal_session cookie persists the login across every page.
 */
(function () {
  "use strict";

  var STYLE = [
    ".cl-wrap{display:flex;align-items:center;margin-right:auto;margin-left:24px}",
    ".cl-btn{display:inline-flex;align-items:center;",
      "font:600 13px/1 'Montserrat',system-ui,sans-serif;letter-spacing:.02em;",
      "padding:9px 17px;border-radius:999px;border:1px solid #d00008;color:#d00008;",
      "background:transparent;cursor:pointer;transition:background .15s,color .15s}",
    ".cl-btn:hover{background:#d00008;color:#fff}",
    ".cl-user{display:flex;align-items:center;gap:9px;",
      "font:13px 'Montserrat',system-ui,sans-serif}",
    ".cl-dot{width:7px;height:7px;border-radius:50%;background:#1a7f37;flex:none}",
    "a.cl-name{font-weight:700;color:#1a1a1a;text-decoration:none}",
    "a.cl-name:hover{color:#d00008}",
    ".cl-logout{font:600 12px 'Montserrat',system-ui,sans-serif;color:#5a5a5a;",
      "background:none;border:1px solid #d8d8dc;border-radius:999px;",
      "padding:6px 12px;cursor:pointer}",
    ".cl-logout:hover{border-color:#d00008;color:#d00008}",
    ".cl-modal{position:fixed;inset:0;z-index:99999;display:none;",
      "align-items:center;justify-content:center;background:rgba(20,20,22,.55)}",
    ".cl-modal.cl-open{display:flex}",
    ".cl-card{background:#fff;width:90%;max-width:380px;border-radius:14px;",
      "border-top:3px solid #d00008;padding:28px 30px 24px;",
      "font-family:'Montserrat',system-ui,sans-serif;",
      "box-shadow:0 24px 60px rgba(0,0,0,.3)}",
    ".cl-card h2{margin:0;font-size:20px;font-weight:800;color:#1a1a1a}",
    ".cl-card .cl-sub{margin:4px 0 18px;font-size:13px;color:#5a5a5a}",
    ".cl-field{margin-bottom:13px}",
    ".cl-field label{display:block;font-size:11px;font-weight:700;",
      "text-transform:uppercase;letter-spacing:.05em;color:#5a5a5a;margin-bottom:5px}",
    ".cl-field input{width:100%;box-sizing:border-box;",
      "font:14px 'Montserrat',system-ui,sans-serif;padding:10px 12px;",
      "border:1px solid #cdcdd1;border-radius:8px}",
    ".cl-field input:focus{outline:none;border-color:#d00008}",
    ".cl-submit{width:100%;font:700 13px 'Montserrat',system-ui,sans-serif;",
      "text-transform:uppercase;letter-spacing:.04em;padding:12px;border:none;",
      "border-radius:999px;background:#d00008;color:#fff;cursor:pointer;margin-top:4px}",
    ".cl-submit:disabled{opacity:.6;cursor:not-allowed}",
    ".cl-err{color:#d00008;font-size:12.5px;font-weight:600;margin-top:10px;min-height:16px}",
    ".cl-x{float:right;font-size:22px;line-height:1;color:#9a9a9a;background:none;",
      "border:none;cursor:pointer;margin:-4px -6px 0 0}",
    ".cl-hint{margin-top:15px;padding-top:13px;border-top:1px solid #ececee;",
      "font-size:11.5px;color:#9a9a9a;text-align:center}",
    "@media(max-width:680px){.cl-wrap{margin-left:12px}",
      ".cl-btn{padding:7px 12px;font-size:12px}}"
  ].join("");

  var wrap = null, modal = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function renderLoggedOut() {
    wrap.innerHTML = "";
    var b = document.createElement("button");
    b.type = "button";
    b.className = "cl-btn";
    b.textContent = "Customer Login";
    b.addEventListener("click", openModal);
    wrap.appendChild(b);
  }

  function renderLoggedIn(name) {
    wrap.innerHTML =
      '<div class="cl-user">' +
      '<span class="cl-dot"></span>' +
      '<a class="cl-name" href="/portal/" title="Go to your portal">' +
      esc(name) + "</a>" +
      '<button type="button" class="cl-logout">Log out</button>' +
      "</div>";
    wrap.querySelector(".cl-logout").addEventListener("click", doLogout);
  }

  function refresh() {
    fetch("/portal/api/me", { credentials: "same-origin" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && d.client && d.client.name) renderLoggedIn(d.client.name);
        else renderLoggedOut();
      })
      .catch(function () { renderLoggedOut(); });
  }

  function doLogout() {
    fetch("/portal/api/logout", { method: "POST", credentials: "same-origin" })
      .then(function () { renderLoggedOut(); })
      .catch(function () { renderLoggedOut(); });
  }

  function buildModal() {
    modal = document.createElement("div");
    modal.className = "cl-modal";
    modal.innerHTML =
      '<div class="cl-card">' +
      '<button class="cl-x" type="button" aria-label="Close">&times;</button>' +
      "<h2>Customer Login</h2>" +
      '<p class="cl-sub">Sign in to reach your licensed Radiant apps.</p>' +
      "<form>" +
      '<div class="cl-field"><label for="cl-email">Email</label>' +
      '<input id="cl-email" type="email" autocomplete="username" required></div>' +
      '<div class="cl-field"><label for="cl-pw">Password</label>' +
      '<input id="cl-pw" type="password" autocomplete="current-password" required></div>' +
      '<button class="cl-submit" type="submit">Sign In</button>' +
      '<div class="cl-err"></div>' +
      "</form>" +
      '<div class="cl-hint">Need access? Contact Radiant Medical Physics.</div>' +
      "</div>";
    document.body.appendChild(modal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
    modal.querySelector(".cl-x").addEventListener("click", closeModal);
    modal.querySelector("form").addEventListener("submit", onSubmit);
  }

  function openModal() {
    if (!modal) buildModal();
    modal.querySelector(".cl-err").textContent = "";
    modal.querySelector("form").reset();
    modal.classList.add("cl-open");
    modal.querySelector("#cl-email").focus();
  }

  function closeModal() {
    if (modal) modal.classList.remove("cl-open");
  }

  function onSubmit(e) {
    e.preventDefault();
    var errEl = modal.querySelector(".cl-err");
    var btn = modal.querySelector(".cl-submit");
    errEl.textContent = "";
    btn.disabled = true;
    fetch("/portal/api/login", {
      method: "POST",
      credentials: "same-origin",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: modal.querySelector("#cl-email").value.trim(),
        password: modal.querySelector("#cl-pw").value
      })
    })
      .then(function (r) {
        return r.json().catch(function () { return {}; })
          .then(function (j) { return { ok: r.ok, j: j }; });
      })
      .then(function (res) {
        if (res.ok) { closeModal(); refresh(); }
        else { errEl.textContent = (res.j && res.j.error) || "Sign-in failed."; }
      })
      .catch(function () { errEl.textContent = "Could not reach the server."; })
      .then(function () { btn.disabled = false; });
  }

  function onKeydown(e) {
    if (e.key === "Escape" && modal && modal.classList.contains("cl-open")) {
      closeModal();
    }
  }

  function mount() {
    var nav = document.querySelector("nav.nav");
    if (!nav) return;

    var style = document.createElement("style");
    style.textContent = STYLE;
    document.head.appendChild(style);

    wrap = document.createElement("div");
    wrap.className = "cl-wrap";
    var brand = nav.querySelector(".brand");
    if (brand) nav.insertBefore(wrap, brand.nextSibling);
    else nav.insertBefore(wrap, nav.firstChild);

    document.addEventListener("keydown", onKeydown);
    renderLoggedOut();
    refresh();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
