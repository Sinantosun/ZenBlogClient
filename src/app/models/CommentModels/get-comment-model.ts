import { GetSubCommentModel } from "../SubCommentModels/get-subcomment-model";
import { GetUserModel } from "../UserModels/get-user-model";


export class GetCommentListModel {
    user: GetUserModel = new GetUserModel;
    body: string = "";
    blogId: string = "";
    userId: string = "";
    commentDate: Date = new Date;
    subComments: GetSubCommentModel[] = [];
    id:string  ="";

    formActive: boolean = false;
}