import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { catchError } from 'rxjs';
import { CreateParentSubCommentModel } from '../models/ParentSubCommentModels/create-parent-sub-comment.model';



@Injectable({
    providedIn: 'root'
})
export class ParentSubCommentService {
    constructor(private service: GenericService) {

    }
    AddParentSubComment(model: CreateParentSubCommentModel) {
        return this.service.Post("parentSubComments", model).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }

    getList() {
        this.service.Get("parentSubComments").pipe(
            catchError((err) => {
                throw err;
            })
        )
    }
}
