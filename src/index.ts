import { ApolloServer } from "apollo-server-express";
import express from "express";
import { Query, Product, Category } from "./resolvers";
import { typeDefs } from "./typeDefs";

async function StartApolloServer() {
  const app = express();
  const PORT = 4000 || process.env.PORT;

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: { Query, Product, Category },
  });
  // 起動
  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });
  app.use((_req, res) => {
    res.send("初めてのApollo Server");
  });

  app.listen(PORT, () =>
    console.log(`サーバー起動中 URL: http://localhost:${PORT}`)
  );
}

StartApolloServer();
