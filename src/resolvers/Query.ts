import { Categories, idStr, Products } from "../types";

// 商品、またはカテゴリーの情報を返すリゾルバー
const Query = {
  // 商品一覧情報
  products: (_parent: any, { filter }: any, { products }: Products) => {
    let filteredProducts = products;

    if (filter) {
      if (filter.onSale === true) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.onSale;
        });
      }
    }
    return products;
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
