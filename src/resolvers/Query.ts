import { categories, products } from "../db";

const Query = {
  products: () => {
    return products;
  },
  product: (_parent: any, args: { id: string }, _context: any) => {
    const { id } = args;
    const product = products.find((product) => product.id === id);
    if (!product) return null;
    return product;
  },
  categories: () => {
    return categories;
  },
  category: (_parent: any, args: { id: string }, _context: any) => {
    const { id } = args;
    const category = categories.find((category) => category.id === id);
    if (!category) return null;
    return category;
  },
};

export default Query;
