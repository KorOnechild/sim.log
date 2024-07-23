import { getCollection } from "astro:content";
import defineConfig from "../../astro.config.mjs";

export const base = defineConfig.base;

export const defMeta = {
  title: "sim.log",
  description: "sim.log",
  keyword: "sim.log, 기술블로그, 개발블로그, 공부블로그, 블로그, 개발자, 일상",
};

// 게시글 최신순 비교 함수
const orderByDesc = (a, b) => {
  return b.data.date - a.data.date;
};

// 게시글 가져온 후 최신순 정렬
export const getPosts = async (post) =>
  (await getCollection(post)).sort(orderByDesc);

// 날짜 포맷 계산 함수
export const subDate = (date) =>
  `${date.getFullYear()}-${
    (date.getMonth() >= 10 ? (date.getMonth() + 1) : `0` + (date.getMonth() + 1))
  }-${date.getDate() >= 10 ? date.getDate() : `0` + date.getDate()}`;
