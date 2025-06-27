window.addEventListener("appinstalled", () => {
  localStorage["installURL"] = window.location.pathname;
});
