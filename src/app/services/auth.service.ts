import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { catchError } from 'rxjs';
import { LoginUserModel } from '../models/LoginModels/login-user-model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyAlertHandler } from '../tools/alertify-alert-handler';
import { RegisterUserModel } from '../models/UserModels/register-user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private genericService: GenericService, private router: Router) { }
  private decodedToken: any;

  private jwtHelper: JwtHelperService = new JwtHelperService();

  login(model: LoginUserModel) {
    return this.genericService.Post("users/login", model).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

   registerUser(model: RegisterUserModel) {
    return this.genericService.Post("users/Register", model).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }


  logout() {
    localStorage.removeItem("_jwt");
    this.router.navigateByUrl("login");
  }
  userlogOut() {
    localStorage.removeItem("_jwt");
    this.router.navigateByUrl("home");
  }


  decodeToken() {
    let token = localStorage.getItem("_jwt");
    if (token) {
      return this.decodedToken = this.jwtHelper.decodeToken(token);
    }
    return "-1";
  }

  isAdmin() {
    var token = this.decodeToken();
    if (token != "-1") {
      if (token.role.includes("Admin")) {
        return true;
      }
      else {
        AlertifyAlertHandler.AlertifyError("Bu sayfaya giriş yetkiniz yok..!");
        this.router.navigateByUrl("home");
        return true;
      }
    }
    return false;

  }

  loggedIn() {
    let token = localStorage.getItem("_jwt");
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserName() {
    let token = this.decodeToken();
    return token.name;
  }
  getuserId() {
    let token = this.decodeToken();
    return token.sub;
  }
  getFullName() {
    let token = this.decodeToken();
    return token.FullName;
  }


}
