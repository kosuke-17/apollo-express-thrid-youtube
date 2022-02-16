import { Categories, CategoryId, idStr, Reviews } from "../types";

const Product = {
  category: (
    { categoryId }: CategoryId,
    _args: any,
    { categories }: Categories
  ) => {
    return categories.find((category) => category.id === categoryId);
  },
  reviews: ({ id }: idStr, _args: any, { reviews }: Reviews) => {
    return reviews.filter((review) => review.productId === id);
  },
};

export default Product;
