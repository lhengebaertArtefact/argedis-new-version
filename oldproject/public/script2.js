if (typeof window !== "undefined" && window.localStorage) {
  const installedFrom = localStorage["installURL"];
  if (
    installedFrom &&
    !window.location.pathname.includes(installedFrom) &&
    !window.location.pathname.includes("list")
  ) {
    window.location.replace(installedFrom);
  }
}
