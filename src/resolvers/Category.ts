import { idStr, Products } from "../types";

const Category = {
  products: ({ id }: idStr, _args: idStr, { products }: Products) => {
    return products.filter((product) => product.categoryId === id);
  },
};
export default Category;
