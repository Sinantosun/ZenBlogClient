import { Component, OnInit } from '@angular/core';
import { LoginUserModel } from '../../models/LoginModels/login-user-model';
import { AuthService } from '../../services/auth.service';
import { AlertifyAlertHandler } from '../../tools/alertify-alert-handler';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit {


  model: LoginUserModel = new LoginUserModel;
  token: any;

  private returnUrl: string = "";
  constructor(private service: AuthService, private router: Router, private activeRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      let url = param["returnUrl"];
      if (url) {
        this.returnUrl = url;
      }
    })
  }
  login() {
    this.service.login(this.model).subscribe({
      next: (response: any) => {
        this.token = response.data.token;
        localStorage.setItem("_jwt", this.token);
      },
      error: (err) => {
        AlertifyAlertHandler.AlertifyError(err.error.errors[0].errorMessage);
      },
      complete: () => {
        AlertifyAlertHandler.AlertifySuccess("Giriş Başarılı Hoş Geldiniz...!");
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
        else {
          this.router.navigateByUrl("/home");
        }
      }
    })
  }
}
