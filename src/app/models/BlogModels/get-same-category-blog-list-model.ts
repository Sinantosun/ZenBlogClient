import { GetUserModel } from "../UserModels/get-user-model";

export class GetSameCategoryBlogListModel {
    id: string = "";
    createdAt: Date = new Date();
    title: string = "";
    coverImage: string = "";
    description: string = ""
    categoryId: string = "";
    userId: string = "";
    subDescription: string = "";

    user: GetUserModel = new GetUserModel;

}