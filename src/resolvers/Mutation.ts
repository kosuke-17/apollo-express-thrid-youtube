import { v4 as uuid } from "uuid";
import { Categories, InputName, Product } from "../types";

const Mutation = {
  /**
   * カテゴリー追加処理.
   *
   * @param _parent - 親リゾルバから受け取るオブジェクト
   * @param args - カテゴリー名
   * @param context - カテゴリー一覧情報
   * @returns 追加したカテゴリー
   */
  addCategory: (
    _parent: any,
    { input }: InputName,
    { categories }: Categories
  ) => {
    const product: [Product] = [
      {
        id: "",
        name: "",
        description: "",
        image: "",
        quantity: 0,
        price: 0,
        onSale: false,
        categoryId: "",
      },
    ];
    const { name } = input;
    const newCategory = {
      id: uuid(),
      name,
      products: product,
    };
    categories.push(newCategory);
    return newCategory;
  },
  /**
   * 商品追加処理.
   *
   * @param _parent - 親リゾルバから受け取るオブジェクト
   * @param args - 追加したい商品情報
   * @param context - 商品一覧情報
   * @returns 追加した商品情報
   */
  addProduct: (_parent: any, { input }: any, { products }: any) => {
    const { name, description, image, quantity, price, onSale, CategoryId } =
      input;

    const newProduct = {
      id: uuid(),
      name,
      description,
      image,
      quantity,
      price,
      onSale,
      CategoryId,
    };

    products.push(newProduct);

    return newProduct;
  },

  /**
   * レビュー追加処理.
   *
   * @param _parent - 親リゾルバから受け取るオブジェクト
   * @param args - 追加したいレビュー情報
   * @param context - レビュー一覧情報
   * @returns 追加した商品情報
   */
  addReview: (_parent: any, { input }: any, { reviews }: any) => {
    const { title, comment, date, rating, productId } = input;
    const newReview = {
      id: uuid(),
      title,
      comment,
      date,
      rating,
      productId,
    };
    reviews.push(newReview);
    return newReview;
  },
};

export default Mutation;
