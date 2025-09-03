import { GetUserModel } from "../UserModels/get-user-model";

export class GetSubCommentModel {
    userId: string = "";
    user: GetUserModel = new GetUserModel;
    body: string = ""
    commentId: string = ""
    commentDate: Date = new Date();
}