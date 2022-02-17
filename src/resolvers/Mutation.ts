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
  addProduct: (_parent: any, { input }: InputName, { categories }: any) => {},
};

export default Mutation;
