import { idStr, Products } from "../types";

const Category = {
  products: ({ id }: idStr, { filter }: any, { products }: Products) => {
    // カテゴリーIDと外部キーのカテゴリーIDが一致した商品を格納
    const categoryProducts = products.filter(
      (product) => product.categoryId === id
    );

    let filterdCategoryProduct = categoryProducts;

    if (filter) {
      if (filter.onSale === true) {
        filterdCategoryProduct = filterdCategoryProduct.filter((product) => {
          return product.onSale;
        });
      }
    }
    return filterdCategoryProduct;
  },
};
export default Category;
