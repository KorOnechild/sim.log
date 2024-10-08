document.addEventListener("astro:page-load", () => {

  const getToc = (headLine) => {
    let temp_html = "";
    let isOpenedNestedUl = false;
    return createToc(headLine, 0, null, true, null, temp_html, isOpenedNestedUl);
  };

  // TOC 생성 함수
  const createToc = (
    arr,
    curIdx,
    isPrevH1,
    isCurH1,
    isNextH1,
    temp_html,
    isOpenedNestedUl
  ) => {
    // 탈출 조건
    if (arr.length === curIdx) {
      temp_html = "<ul>" + temp_html + "</ul>";
      return temp_html;
    }
    const re = /[!?./()]/g;
    const curValue = arr[curIdx];
    const curText = curValue.replaceAll("#", "").trimStart();
    const curId = curValue
      .replaceAll("#", "")
      .toLowerCase()
      .trimStart()
      .replaceAll(re, "")
      .replaceAll(" ", "-");
    isPrevH1 =
      arr[curIdx - 1] !== undefined
        ? arr[curIdx - 1].charAt(1) === " "
        : null;
    isCurH1 = curValue.charAt(1) === " ";
    isNextH1 =
      arr[curIdx + 1] !== undefined
        ? arr[curIdx + 1].charAt(1) === " "
        : null;

    if (isPrevH1 && isPrevH1 !== null && !isCurH1) {
      temp_html = temp_html + '<ul class="toc ul">';
      isOpenedNestedUl = true;
    }

    temp_html =
      curIdx === 0
        ? temp_html +
          `<li class="toc li selected"><a href="#${curId}">${curText}</a></li>`
        : temp_html +
          `<li class="toc li"><a href="#${curId}">${curText}</a></li>`;

    if (isOpenedNestedUl && (isNextH1 || isNextH1 === null)) {
      temp_html = temp_html + "</ul>";
      isOpenedNestedUl = false;
    }
    return createToc(
      arr,
      curIdx + 1,
      isPrevH1,
      isCurH1,
      isNextH1,
      temp_html,
      isOpenedNestedUl
    );
  };


  const tocContainer = document.getElementsByClassName("toc container")[0];

  if (tocContainer !== undefined) {
    const body = tocContainer.dataset.body.split(",");
    const temp_toc = getToc(body);
    tocContainer.innerHTML = temp_toc;
  }

  const tags = document.querySelectorAll(".markdown > h1, .markdown > h2");
  const lis = document.querySelectorAll(".toc.li");
  const footer = document.querySelector("footer");

  for (let i = 0; i < tags.length; i++) {
    tags[i].dataset.index = i;
    lis[i].dataset.index = i;
  }

  let tocOptions = {
    root: null,
    rootMargin: "-3% 0% -75% 0%",
    threshold: 1,
  };

  let curIdx = 0;

  const tocObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
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

  if (tocContainer !== undefined) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          tocContainer.style.visibility = "";
          document.addEventListener("astro:page-load", () => {
            const tags = document.querySelectorAll(
              ".markdown > h1, .markdown > h2"
            );
            const lis = document.querySelectorAll(".toc.li");
            const footer = document.querySelector("footer");
            for (let i = 0; i < tags.length; i++) {
              tags[i].dataset.index = i;
              lis[i].dataset.index = i;
            }

            let tocOptions = {
              root: null,
              rootMargin: "-3% 0% -75% 0%",
              threshold: 1,
            };

            let curIdx = 0;

            const tocObserver = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
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
          });
        } else if (entry.isIntersecting) {
          tocContainer.style.visibility = "hidden";
        }
      });
    }, footerOptions);
    footerObserver.observe(footer);
  }
});
