import { gql } from "apollo-server-express";
export const typeDefs = gql`
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
    category: Category
  }

  # カテゴリーのデータ型
  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`;
