import { GetSubCommentModel } from "../SubCommentModels/get-subcomment-model";
import { GetUserModel } from "../UserModels/get-user-model";


export class GetCommentListModel {
    user: GetUserModel = new GetUserModel;
    body: string = "";
    blogId: string = "";
    commentDate : Date = new Date;
    subComments: GetSubCommentModel[] = [];
}