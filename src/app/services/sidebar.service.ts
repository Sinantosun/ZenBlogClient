import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    private collepsed = new BehaviorSubject<boolean>(false);
    collepsed$ = this.collepsed.asObservable();

    togleSideBar() {
        this.collepsed.next(!this.collepsed.value);
    }
}
