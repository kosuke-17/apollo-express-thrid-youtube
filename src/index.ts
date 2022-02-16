import { ApolloServer } from "apollo-server-express";
import express from "express";
import { categories, products, reviews } from "./db";
import { Query, Product, Category } from "./resolvers";
import { typeDefs } from "./typeDefs";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";

async function StartApolloServer() {
  const app = express();
  const PORT = process.env.PORT || 4000;

  /**
   * ApolloServerをインスタンス化
   *
   * @param
   *  - typeDefs : スキーマ定義
   *  - resolvers : スキーマに紐づいたデータの処理
   *  - context : dbファイルから取得してきた仮データをresokbersに共有
   *
   */
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: { Query, Product, Category },
    context: {
      categories,
      products,
      reviews,
    },
    plugins: [
      // Install a landing page plugin based on NODE_ENV
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault({
            graphRef: "my-graph-id@my-graph-variant",
            footer: false,
          })
        : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ],
  });
  // 起動
  await apolloServer.start();

  // expressをミドルウェアとしてアポロサーバーに適応
  apolloServer.applyMiddleware({ app: app });
  app.use((_req, res) => {
    res.send("初めてのApollo Server");
  });

  app.listen(PORT, () =>
    console.log(`起動中 GraphQL PlayGround: http://localhost:${PORT}/graphql`)
  );
}

StartApolloServer();
