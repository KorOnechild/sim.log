import { getCollection } from "astro:content";

// 게시글 최신순 비교 함수
const orderByDesc = (a, b) => {
  return b.data.date - a.data.date;
};

// 게시글 가져온 후 최신순 정렬
export const getPosts = async (post) =>
  (await getCollection(post)).sort(orderByDesc);

// 날짜 포맷 계산 함수
export const subDate = (date) => {
  return `${date.getFullYear()}-${
    date.getMonth() >= 10 ? date.getMonth() + 1 : `0` + (date.getMonth() + 1)
  }-${date.getDate() >= 10 ? date.getDate() : `0` + date.getDate()}`;
};

// TOC 생성 함수
export const getTree = (
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
    temp_html = temp_html + "</ul>";
    return temp_html.valueOf();
  }
  const re = /[!?.]/g;
  const curValue = arr[curIdx];
  const curText = curValue.replaceAll("#", "").trimStart();
  const curId = curValue
    .replaceAll("#", "")
    .toLowerCase()
    .trimStart()
    .replaceAll(re, "")
    .replaceAll(" ", "-");
  var isPrevH1 =
    arr[curIdx - 1] !== undefined ? arr[curIdx - 1].charAt(1) === " " : null;
  var isCurH1 = curValue.charAt(1) === " ";
  var isNextH1 =
    arr[curIdx + 1] !== undefined ? arr[curIdx + 1].charAt(1) === " " : null;

  if (isPrevH1 && isPrevH1 !== null && !isCurH1) {
    temp_html += `<ul class="toc ul">`;
    isOpenedNestedUl = true;
  }

  temp_html += `<li class="toc li"><a href="#${curId}">${curText}</a></li>`;

  if (isOpenedNestedUl && (isNextH1 || isNextH1 === null)) {
    temp_html += "</ul>";
    isOpenedNestedUl = false;
  }

  return getTree(
    arr,
    curIdx + 1,
    isPrevH1,
    isCurH1,
    isNextH1,
    temp_html,
    isOpenedNestedUl
  );
};
