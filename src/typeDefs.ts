import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type Query {
    """
    商品一覧情報を取得。filter : { onSale: 真偽値, avgRating: レビュー評価平均値}
    """
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

  type Mutation {
    addCategory(input: AddCategoryInput): Category!
    addProduct(input: AddProductInput): Product!
  }

  input AddCategoryInput {
    name: String!
  }
  input AddProductInput {
    name: String!
    description: String!
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    categoryId: String!
  }
`;
