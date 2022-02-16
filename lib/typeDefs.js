"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Query {
    products(filter: ProductsFilterInput): [Product!]!
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
    category: Category
    reviews: [Review!]!
  }

  # カテゴリーのデータ型
  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  # 商品レビューのデータ型
  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
    product: Product
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }
`;
