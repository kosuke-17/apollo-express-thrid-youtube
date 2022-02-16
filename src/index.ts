import { ApolloServer, gql } from "apollo-server-express";
import express from "express";

async function StartApolloServer() {
  const app = express();
  const PORT = 4000 || process.env.PORT;
  const typeDefs = gql`
    type Query {
      hello: String
      numberOfAnimals: Int
      price: Float
    }
  `;

  const resolvers = {
    Query: {
      hello: () => {
        return "hello world";
      },
      numberOfAnimals: () => {
        return 55;
      },
      price: () => {
        return 222.112234;
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
