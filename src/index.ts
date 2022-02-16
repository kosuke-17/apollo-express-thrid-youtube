import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import { categories, products } from "./db";

async function StartApolloServer() {
  const app = express();
  const PORT = 4000 || process.env.PORT;
  const typeDefs = gql`
    type Query {
      products: [Product!]!
      product(id: ID!): Product
      categories: [Category!]!
      category(id: ID!): Category
    }

    # 商品のデータ型
    type Product {
      id: ID!
      name: String!
      description: String!
      image: String!
      quantity: Int!
      price: Float!
      onSale: Boolean!
      # category: Category
    }

    # カテゴリーのデータ型
    type Category {
      id: ID!
      name: String!
      products: [Product!]!
    }
  `;

  const resolvers = {
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
  };
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });
  // 起動
  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });
  app.use((req, res) => {
    res.send("初めてのApollo Server");
  });

  app.listen(PORT, () =>
    console.log(`サーバー起動中 URL: http://localhost:${PORT}`)
  );
}

StartApolloServer();
