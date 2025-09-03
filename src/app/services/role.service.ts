import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { catchError, Observable } from 'rxjs';
import { Result } from '../models/Other/result-model';
import { GetRoleModel } from '../models/UserModels/get-role-model';
import { AddRoleModel } from '../models/UserModels/add-role-model';
import { UpdateRoleModel } from '../models/UserModels/update-role-model';
import { AddOrUpdateRoleToUserModel } from '../models/UserModels/add-or-update-role-to-user-model';
import { AddRoleToUserModel } from '../models/UserModels/add-role-to-user-model';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private service: GenericService) {

    }

    GetUserAndRoles(id: string): Observable<Result<AddOrUpdateRoleToUserModel[]>> {
        return this.service.Get<AddOrUpdateRoleToUserModel[]>(`users/GetUserAndRoles/${id}`).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }


    GetRoles(page: number = 1): Observable<Result<GetRoleModel[]>> {
        return this.service.Get<GetRoleModel[]>("users/GetRoles").pipe(
            catchError((err) => {
                throw err;
            })
        );
    }

    AddRole(model: AddRoleModel) {
        return this.service.Post("users/AddRole", model).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }
    AddRoleToUser(model: AddRoleToUserModel) {
        return this.service.Post("users/AddRoleToUser", model).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }

    GetRoleById(id: string) {
        return this.service.Get(`users/GetRole/${id}`).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }

    UpdateRole(model: UpdateRoleModel) {
        return this.service.Put("users/UpdateRole", model).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }

    RemoveRole(id: string) {
        return this.service.Delete(`users/RemoveRole/${id}`).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }


}
