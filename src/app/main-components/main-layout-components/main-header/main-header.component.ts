import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SweetAlertHandler } from '../../../tools/sweet-alert-handler';

@Component({
  selector: 'app-main-header',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css'
})
export class MainHeaderComponent {

  constructor(private autService: AuthService) {

  }

  signOut() {
    SweetAlertHandler.ShowConfirmMessage("Oturum Sonlandırma","Çıkış yapmak istediğinize emin misiniz?").then(result => {
      if (result.isConfirmed) { 
        this.autService.userlogOut();
      }
    })
  }

  isLogin() {
    return this.autService.loggedIn();
  }

  GetFullName(){
    return this.autService.getFullName();
  }


}
