import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { catchError, Observable } from 'rxjs';
import { Result } from '../models/Other/result-model';
import { CreateSocialMedia } from '../models/SocialModels/create-social-model';
import { UpdateSocialModel } from '../models/SocialModels/update-social-model';
import { GetSocialListModel } from '../models/SocialModels/get-social-list-model';

@Injectable({
    providedIn: 'root'
})
export class SocialService {
    constructor(private service: GenericService) {

    }
    CreateSocial(model: CreateSocialMedia) {
        return this.service.Post("socials", model).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }
    UpdateSocial(model: UpdateSocialModel) {
        return this.service.Put("socials", model).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }

    GetSocial(): Observable<Result<GetSocialListModel[]>> {
        return this.service.Get<GetSocialListModel[]>("socials").pipe(
            catchError((err) => {
                throw err;
            })
        );
    }

    RemoveSocial(id: string) {
        return this.service.Delete(`socials/${id}`).pipe(
            catchError((err) => {
                throw err;
            })
        )
    }
    GetByIdSocial(id: string) {
        return this.service.Get(`socials/${id}`).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }
}
