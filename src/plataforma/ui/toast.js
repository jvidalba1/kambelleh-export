export function showToast(msg) {
  let el = document.getElementById("toast-banner");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast-banner";
    el.style.cssText =
      "position:fixed; bottom:16px; left:50%; transform:translateX(-50%); background:var(--bg-panel-solid); border:1px solid var(--gold); color:var(--gold); padding:10px 16px; border-radius:100px; font-family:'Plus Jakarta Sans'; font-size:12px; z-index:1000; box-shadow:0 4px 16px rgba(0,0,0,.4); max-width:90%; text-align:center;";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = "1";
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    el.style.opacity = "0";
  }, 4000);
}
