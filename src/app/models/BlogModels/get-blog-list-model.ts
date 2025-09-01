import { GetCategoryListModel } from "../CategoryModels/get-categroy-list-model";

export class GetBlogListModel {
    id: string = "";
    title: string = "";
    coverImage: string = "";
    blogImage: string = "";
    description: string = ""
    categoryId: string = "";
    userId: string = "";

    category: GetCategoryListModel = new GetCategoryListModel;
}