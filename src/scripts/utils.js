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

// 카테고리 목록
export const getCategory = (posts) => {
  // let prevCategory;
  // let currentCategory;
  // let data = [];
  // return [
  // // ...new Set(
  // //   posts.map((post) => {
  // //     return post.data.category;
  // //   })
  // // ),
  // posts.map((i, post) => {
  //   prevCategory = post.data.category
  //   currentCategory = post.data.category
  //   console.log(post.data)
  //   return post.data.category;
  // })
  // let result = posts.reduce((acc, post) => {
  //   // 카테고리가 이미 존재하는지 확인
  //   const existingCategory = acc.find(el => el.category === post.data.category);

  //   if (existingCategory) {
  //     // series가 있으면 중복되지 않게 추가
  //     if (post.data.series && !existingCategory.series.includes(post.data.series)) {
  //       existingCategory.series.push(post.data.series);
  //     }
  //   } else {
  //     // 새 카테고리 생성
  //     const newCategory = { category: post.data.category };
  //     if (post.data.series) {
  //       newCategory.series = [post.data.series];
  //     }
  //     acc.push(newCategory);
  //   }

  //   return acc;
  // }, []);

  const categoryMap = new Map();

  posts.forEach((post) => {
    if (categoryMap.has(post.data.category)) {
      const seriesSet = categoryMap.get(post.data.category); 
      seriesSet.add(post.data.series); 
    } else {

      categoryMap.set(post.data.category, new Set([post.data.series]));
    }
  });
  return categoryMap;
};
