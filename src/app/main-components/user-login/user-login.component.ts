import { Component } from '@angular/core';
import { LoginUserModel } from '../../models/LoginModels/login-user-model';
import { AuthService } from '../../services/auth.service';
import { AlertifyAlertHandler } from '../../tools/alertify-alert-handler';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {


  model: LoginUserModel = new LoginUserModel;
  token: any;
  constructor(private service: AuthService, private router: Router) {

  }
  login() {
    this.service.login(this.model).subscribe({
      next: (response: any) => {
        this.token = response.data.token;
        localStorage.setItem("_jwt", this.token);
        let item = this.service.decodeToken();
        console.log(item);
      },
      error: (err) => {
        AlertifyAlertHandler.AlertifyError(err.error.errors[0].errorMessage);
      },
      complete: () => {
        AlertifyAlertHandler.AlertifySuccess("Giriş Başarılı Hoş Geldiniz...!");
        this.router.navigateByUrl("/home");
      }
    })
  }
}
