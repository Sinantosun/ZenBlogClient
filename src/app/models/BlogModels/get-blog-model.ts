import { GetCategoryListModel } from "../CategoryModels/get-categroy-list-model";
import { GetCommentListModel } from "../CommentModels/get-comment-model";
import { GetSubCommentModel } from "../SubCommentModels/get-subcomment-model";
import { GetUserModel } from "../UserModels/get-user-model";

export class GetBlogByIdModel {
    id: string = "";
    createdAt: Date = new Date();
    title: string = "";
    coverImage: string = "";
    blogImage: string = "";
    description: string = ""
    categoryId: string = "";
    userId: string = "";
    subDescription: string = "";
    comments: GetCommentListModel[] = [];

    
    user: GetUserModel = new GetUserModel;

    category: GetCategoryListModel = new GetCategoryListModel;
}