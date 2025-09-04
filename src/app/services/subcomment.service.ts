import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { catchError } from 'rxjs';
import { CreateCommentModel } from '../models/CommentModels/create-comment-modelt';
import { CreateSubCommentModel } from '../models/SubCommentModels/create-sub-comment-model';


@Injectable({
    providedIn: 'root'
})
export class SubCommentService {
    constructor(private service: GenericService) {

    }
    AddSubComment(model: CreateSubCommentModel) {
        return this.service.Post("subcomments", model).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }
}
