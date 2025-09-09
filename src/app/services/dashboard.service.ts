import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private service: GenericService) {

    }

    GetDashboardWidgets() {
       return this.service.Get("dashboard").pipe(
            catchError((err) => {
                throw err;
            })
        )
    }

}
