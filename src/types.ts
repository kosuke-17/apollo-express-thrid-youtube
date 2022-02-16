export type idStr = {
  id: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  quantity: number;
  price: number;
  onSale: boolean;
  categoryId: string;
};

export type Products = { products: Product[] };

export type Category = {
  id: string;
  name: string;
  products: [Product];
};

export type Categories = { categories: Category[] };
export type CategoryId = { categoryId: Category["id"] };
