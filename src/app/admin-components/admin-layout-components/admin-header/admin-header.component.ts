import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SweetAlertHandler } from '../../../tools/sweet-alert-handler';

@Component({
  selector: 'app-admin-header',
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  constructor(private authservice: AuthService) {

  }

  getNameSurname() {
    return this.authservice.getFullName();
  }

  logout() {
    SweetAlertHandler.ShowConfirmMessage("Oturum Sonlandırma","Çıkış yapmak istediğinize emin misiniz").then((result) => {
      if (result.isConfirmed) {
        this.authservice.logout();
      }
    })
  }

}
