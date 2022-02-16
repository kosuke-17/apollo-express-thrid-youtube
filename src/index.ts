import { ApolloServer } from "apollo-server-express";
import express from "express";
import { categories, products, reviews } from "./db";
import { Query, Product, Category } from "./resolvers";
import { typeDefs } from "./typeDefs";

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
