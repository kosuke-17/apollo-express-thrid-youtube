import { v4 as uuid } from "uuid";
import { InputName } from "../types";

const Mutation = {
  /**
   * カテゴリー追加処理.
   *
   * @param _parent - 親リゾルバから受け取るオブジェクト
   * @param args - カテゴリー名
   * @param context - カテゴリー一覧情報
   * @returns 追加したカテゴリー
   */
  addCategory: (_parent: any, { input }: InputName, { categories }: any) => {
    const { name } = input;
    const newCategory = {
      id: uuid(),
      name,
    };
    categories.push(newCategory);
    return newCategory;
  },
};

export default Mutation;
