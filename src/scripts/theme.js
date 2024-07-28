document.addEventListener("astro:page-load", () => {
  const htmlClassName = document.getElementsByTagName("html")[0].classList;
  const themeButtons = document.getElementById("theme-button");
  const theme = localStorage.getItem("theme");
  htmlClassName.value = theme;

  const changeTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      htmlClassName.value = "dark";
    } else {
      localStorage.setItem("theme", "light");
      htmlClassName.value = "light";
    }
    console.log("hi");
  };
  themeButtons.onclick = changeTheme;
});
