import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SweetAlertHandler } from '../../../tools/sweet-alert-handler';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-admin-header',
  imports: [RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  constructor(private authservice: AuthService, private sideBarService: SidebarService) {

  }
  isCollepsed: boolean = false;
  getNameSurname() {
    return this.authservice.getFullName();
  }

  logout() {
    SweetAlertHandler.ShowConfirmMessage("Oturum Sonlandırma", "Çıkış yapmak istediğinize emin misiniz").then((result) => {
      if (result.isConfirmed) {
        this.authservice.logout();
      }
    })
  }

  toggleSideBar() {
    this.sideBarService.togleSideBar();
    this.isCollepsed = !this.isCollepsed;
  }

}
