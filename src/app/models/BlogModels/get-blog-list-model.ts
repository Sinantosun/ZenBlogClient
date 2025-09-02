import { GetCategoryListModel } from "../CategoryModels/get-categroy-list-model";
import { GetUserModel } from "../UserModels/get-user-model";

export class GetBlogListModel {
    id: string = "";
    createdAt: Date = new Date();
    title: string = "";
    coverImage: string = "";
    blogImage: string = "";
    description: string = ""
    categoryId: string = "";
    userId: string = "";
    subDescription: string = "";

    user: GetUserModel = new GetUserModel;

    category: GetCategoryListModel = new GetCategoryListModel;
}