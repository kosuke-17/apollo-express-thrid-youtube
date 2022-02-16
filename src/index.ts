import { ApolloServer, gql } from "apollo-server-express";
import express from "express";

async function StartApolloServer() {
  const app = express();
  const PORT = 4000 || process.env.PORT;
  const typeDefs = gql`
    type Query {
      products: [Product!]!
    }

    type Product {
      name: String!
      description: String!
      quantity: Int!
      price: Float!
      onSale: Boolean!
    }
  `;

  const resolvers = {
    Query: {
      products: () => {
        return [
          {
            name: "バイク",
            description: "マウンテンバイクです",
            quantity: 20,
            price: 2022,
            onSale: false,
          },
        ];
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
