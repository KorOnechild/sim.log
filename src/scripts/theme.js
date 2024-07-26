document.addEventListener("astro:page-load", () => {
  if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "light");
  }

  const bodyClassName = document.getElementsByTagName("body")[0].classList;
  const themeButtons = document.getElementById("theme-button");
  const theme = localStorage.getItem("theme");
  bodyClassName.value = theme;

  const changeTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      bodyClassName.value = "dark";
    } else {
      localStorage.setItem("theme", "light");
      bodyClassName.value = "light";
    }
    console.log("hi");
  };
  themeButtons.onclick = changeTheme;
});
