import { reviews } from "../db";
import { Categories, idStr, Products } from "../types";

// 商品、またはカテゴリー情報を返すリゾルバー
const Query = {
  // 商品一覧情報(フィルタリング可能)
  products: (_parent: any, { filter }: any, { products }: Products) => {
    let filteredProducts = products;

    // 商品のフィルタリング
    if (filter) {
      const { onSale, avgRating } = filter;
      const rangeNum = [1, 2, 3, 4, 5];
      // filterメソッドで真偽値がtrue
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }
      // 商品の評価平均値がavgより低いか高いかを真偽値で記述
      if (rangeNum.includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numOfReviews = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numOfReviews++;
            }
          });
          const avgProductRating = sumRating / numOfReviews;
          return avgProductRating >= avgRating;
        });
      }
    }
    return filteredProducts;
  },
  // idに紐づく商品詳細情報
  product: (_parent: any, { id }: idStr, { products }: Products) => {
    return products.find((product) => product.id === id);
  },
  // カテゴリー一覧情報
  categories: (_parent: any, _args: idStr, { categories }: Categories) => {
    return categories;
  },
  // idに紐づくカテゴリー詳細情報
  category: (_parent: any, { id }: idStr, { categories }: Categories) => {
    return categories.find((category) => category.id === id);
  },
};

export default Query;
