import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { catchError, Observable } from 'rxjs';
import { Result } from '../models/Other/result-model';
import { GetUserListModel } from '../models/UserModels/get-user-list-model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private service: GenericService) {

    }
    GetUsers(page: number = 1): Observable<Result<GetUserListModel[]>> {
        return this.service.Get<GetUserListModel[]>("users/GetUsers").pipe(
            catchError((err) => {
                throw err;
            })
        );
    }
}
