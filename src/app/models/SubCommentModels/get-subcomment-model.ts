import { GetParentSubCommentListModel } from "../ParentSubCommentModels/get-parent-sub-comment-list-model";
import { GetUserModel } from "../UserModels/get-user-model";

export class GetSubCommentModel {
    id:string = "";
    userId: string = "";
    user: GetUserModel = new GetUserModel;
    body: string = ""
    commentId: string = ""
    commentDate: Date = new Date();

    parentSubComments: GetParentSubCommentListModel[] = [];

    isformActive: boolean = false;
}