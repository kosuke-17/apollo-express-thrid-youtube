import { reviews } from "../db";
import { idStr, Products } from "../types";

const Category = {
  products: ({ id }: idStr, { filter }: any, { products }: Products) => {
    // カテゴリーIDと外部キーのカテゴリーIDが一致した商品を格納
    const categoryProducts = products.filter(
      (product) => product.categoryId === id
    );
    // カテゴライズ商品
    let filterdCategoryProduct = categoryProducts;

    // カテゴライズ商品のフィルタリング
    if (filter) {
      const { onSale, avgRating } = filter;
      const rangeNum = [1, 2, 3, 4, 5];
      // セールしていればfilterdCategoryProductにカテゴライズ商品を格納
      if (onSale) {
        filterdCategoryProduct = filterdCategoryProduct.filter((product) => {
          return product.onSale;
        });
      }
      // avgRatingよりもRatingが高かった商品だったらtrue,低かったらfalse
      if (rangeNum.includes(avgRating)) {
        filterdCategoryProduct = filterdCategoryProduct.filter((product) => {
          let sumRating = 0;
          let numOfReviews = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numOfReviews++;
            }
          });
          const avgCategoryProductRating = sumRating / numOfReviews;
          return avgCategoryProductRating >= avgRating;
        });
      }
    }
    return filterdCategoryProduct;
  },
};
export default Category;
