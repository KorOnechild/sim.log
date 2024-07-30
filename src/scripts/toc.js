document.addEventListener("astro:page-load", () => {
  const tags = document.querySelectorAll("h1, h2");
  const lis = document.querySelectorAll(".toc.li");
  const footer = document.querySelector("footer");
  lis[0].classList.add("selected");

  for (let i = 0; i < tags.length; i++) {
    tags[i].dataset.index = i;
    lis[i].dataset.index = i;
  }

  console.log(footer);

  let tocOptions = {
    root: null,
    rootMargin: "-3% 0% -75% 0%",
    threshold: 1,
  };

  let curIdx = 0;

  const tocObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // console.log(lis);
        lis[curIdx].classList.remove("selected");
        curIdx = entry.target.dataset.index;
        lis[curIdx].classList.add("selected");
      }
    });
  }, tocOptions);
  tags.forEach((li) => tocObserver.observe(li));

  const footerOptions = {
    rootMargin: "0px 0px -299px 0px",
  };
  const toc = document.getElementsByClassName("toc container");
  toc[0].dataset.footer = false;
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        toc[0].style.visibility = "";
        console.log(entry);
      } else if (entry.isIntersecting) {
        toc[0].style.visibility = "hidden";
      }
    });
  }, footerOptions);
  footerObserver.observe(footer);
});
