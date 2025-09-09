import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SweetAlertHandler } from '../../../tools/sweet-alert-handler';
import { GetSocialListModel } from '../../../models/SocialModels/get-social-list-model';
import { SocialService } from '../../../services/social.service';

@Component({
  selector: 'app-main-header',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css'
})
export class MainHeaderComponent implements OnInit {

  socialModel: GetSocialListModel[] = [];
  constructor(private autService: AuthService, private socialService: SocialService) {

  }
  ngOnInit(): void {
    this.socialService.GetSocial().subscribe({
      next: (res: any) => {
        this.socialModel = res.data;
      }
    })
  }

  signOut() {
    SweetAlertHandler.ShowConfirmMessage("Oturum Sonlandırma", "Çıkış yapmak istediğinize emin misiniz?").then(result => {
      if (result.isConfirmed) {
        this.autService.userlogOut();
      }
    })
  }

  isLogin() {
    return this.autService.loggedIn();
  }

  GetFullName() {
    return this.autService.getFullName();
  }


}
