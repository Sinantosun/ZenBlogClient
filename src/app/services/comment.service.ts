import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { catchError } from 'rxjs';
import { CreateCommentModel } from '../models/CommentModels/create-comment-modelt';


@Injectable({
    providedIn: 'root'
})
export class CommentService {
    constructor(private service: GenericService) {

    }
    AddComment(model: CreateCommentModel) {
        return this.service.Post("comments", model).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }
}
