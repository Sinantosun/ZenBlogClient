import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { catchError, Observable } from 'rxjs';
import { Result } from '../models/Other/result-model';
import { GetMessageListModel } from '../models/MessageModels/get-messsage-model';
import { CreateMessageModel } from '../models/MessageModels/create-message-model';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private service: GenericService) {

    }
    SendMessage(model: CreateMessageModel) {
        return this.service.Post("messages", model).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }
    GetMessages(): Observable<Result<GetMessageListModel[]>> {
        return this.service.Get<GetMessageListModel[]>("messages").pipe(
            catchError((err) => {
                throw err;
            })
        );
    }

    GetUnReadMessages() {
        return this.service.Get<GetMessageListModel[]>("messages/GetUnReadMessages").pipe(
            catchError((err) => {
                throw err;
            })
        );
    }
    GetReadMessages() {
        return this.service.Get<GetMessageListModel[]>("messages/GetReadMessages").pipe(
            catchError((err) => {
                throw err;
            })
        );
    }

    changeMessageStatus(id: string) {
        return this.service.Get(`messages/ChangeMessageStatus/${id}`).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }

    DeleteMesssage(id: string) {
      return  this.service.Delete(`messages/${id}`).pipe(
            catchError((err) => {
                throw err;
            })
        );
    }
}
