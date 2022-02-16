import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import { products } from "./db";

async function StartApolloServer() {
  const app = express();
  const PORT = 4000 || process.env.PORT;
  const typeDefs = gql`
    type Query {
      products: [Product!]!
      product(id: ID!): Product
    }

    # 商品のデータ型
    type Product {
      name: String!
      description: String!
      image: String!
      quantity: Int!
      price: Float!
      onSale: Boolean!
    }
  `;

  const resolvers = {
    Query: {
      products: () => {
        return products;
      },
      product: (_parent: any, args: { id: any }, _context: any) => {
        const productId = args.id;
        const product = products.find((product) => product.id === productId);
        if (!product) return null;
        return product;
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
