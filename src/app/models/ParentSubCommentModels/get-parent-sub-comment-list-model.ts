import { GetUserModel } from "../UserModels/get-user-model";

export class GetParentSubCommentListModel {
    id: string = "";
    user: GetUserModel = new GetUserModel;
    body: string = "";
    commentDate: Date = new Date();
    subCommentId: string = "";
}