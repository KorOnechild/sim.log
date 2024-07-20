import { getCollection } from "astro:content";

export const defMeta = {
  title: "sim.log",
  description: "sim.log",
  keyword: "sim.log, 기술블로그, 개발블로그",
};

export const getPosts = async (post) => (
  await getCollection(post)
);
