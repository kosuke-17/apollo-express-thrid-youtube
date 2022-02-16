import { categories } from "../db";

const Product = {
  category: (parent: { categoryId: any }, _args: any, _context: any) => {
    const categoryId = parent.categoryId;

    return categories.find((category) => category.id === categoryId);
  },
};

export default Product;
