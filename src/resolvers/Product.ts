import { Categories, CategoryId } from "../types";

const Product = {
  category: (
    { categoryId }: CategoryId,
    _args: any,
    { categories }: Categories
  ) => {
    return categories.find((category) => category.id === categoryId);
  },
};

export default Product;
