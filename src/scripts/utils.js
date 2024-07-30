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
