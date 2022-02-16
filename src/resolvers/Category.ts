import { products } from "../db";

const Category = {
  products: (parent: { id: string }, _args: { id: string }, _context: any) => {
    const { id } = parent;
    const categories = products.filter((product) => product.categoryId === id);
    return categories;
  },
};
export default Category;
