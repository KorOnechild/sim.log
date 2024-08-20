document.addEventListener("astro:page-load", () => {
  const theme = localStorage.getItem("theme");
  const lightComment = document.getElementsByClassName("light-comment")[0];
  const darkComment = document.getElementsByClassName("dark-comment")[0];
  const commentDiv = document.getElementsByClassName("comment-container")[0];

  if (commentDiv !== undefined) {
    if (theme === "light") {
      darkComment.style.display = "none";
    } else {
      lightComment.style.display = "none";
    }
  }
});
