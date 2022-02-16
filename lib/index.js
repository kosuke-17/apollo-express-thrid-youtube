"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const resolvers_1 = require("./resolvers");
const typeDefs_1 = require("./typeDefs");
function StartApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = 4000 || process.env.PORT;
        /**
         * ApolloServerをインスタンス化
         *
         * @param
         *  - typeDefs : スキーマ定義
         *  - resolvers : スキーマに紐づいたデータの処理
         *  - context : dbファイルから取得してきた仮データをresokbersに共有
         *
         */
        const apolloServer = new apollo_server_express_1.ApolloServer({
            typeDefs: typeDefs_1.typeDefs,
            resolvers: { Query: resolvers_1.Query, Product: resolvers_1.Product, Category: resolvers_1.Category },
            context: {
                categories: db_1.categories,
                products: db_1.products,
                reviews: db_1.reviews,
            },
        });
        // 起動
        yield apolloServer.start();
        // expressをミドルウェアとしてアポロサーバーに適応
        apolloServer.applyMiddleware({ app: app });
        app.use((_req, res) => {
            res.send("初めてのApollo Server");
        });
        app.listen(PORT, () => console.log(`起動中 GraphQL PlayGround: http://localhost:${PORT}/graphql`));
    });
}
StartApolloServer();
