import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { catchError, Observable } from 'rxjs';
import { Result } from '../models/Other/result-model';
import { GetContactInfoModel } from '../models/ContactInfoModels/get-contact-info-model';
import { CreateContactInfoModel } from '../models/ContactInfoModels/create-contact-info-model';
import { UpdateContactInfoModel } from '../models/ContactInfoModels/update-contact-info-model';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  constructor(private service: GenericService) {

  }

  GetAll(): Observable<Result<GetContactInfoModel[]>> {
    return this.service.Get<GetContactInfoModel[]>("contactinfos").pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  AddContactInfo(model: CreateContactInfoModel) {
    return this.service.Post("contactinfos", model).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }

  UpdateContactInfo(model: UpdateContactInfoModel) {
    return this.service.Put("contactinfos", model).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }

  GetContactInfoById(id: string): Observable<Result<UpdateContactInfoModel>> {
    return this.service.Get<UpdateContactInfoModel>(`contactinfos/${id}`).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }

  deleteContactInfo(id: string) {
    return this.service.Delete(`contactinfos/${id}`).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }


}
