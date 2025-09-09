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
    RemoveComment(id: string) {
        return this.service.Delete(`comments/DeleteCommentAndSubComments/${id}`).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }
    GetCommentAnaliyst() {
        return this.service.Get("comments/GetBlogCommentAnalisyts").pipe(
            catchError((err) => {
                throw err;
            })
        );
    }

    translateToEnglish(text: string) {
        return this.service.Get(`comments/GetCommentTranslatedText/${text}`).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }
}
