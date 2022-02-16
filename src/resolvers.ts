import { categories, products } from "./db";

export const resolvers = {
  Query: {
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
  },
  Category: {
    products: (
      parent: { id: string },
      _args: { id: string },
      _context: any
    ) => {
      const { id } = parent;
      const categories = products.filter(
        (product) => product.categoryId === id
      );
      return categories;
    },
  },
  Product: {
    category: (parent: { categoryId: any }, _args: any, _context: any) => {
      const categoryId = parent.categoryId;

      return categories.find((category) => category.id === categoryId);
    },
  },
};
