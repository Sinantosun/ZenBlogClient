import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertifyAlertHandler } from '../../tools/alertify-alert-handler';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RegisterUserModel } from '../../models/UserModels/register-user-model';
@Component({
  selector: 'app-user-register',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  model: RegisterUserModel = new RegisterUserModel;

  constructor(private service: AuthService, private router: Router) {

  }

  register() {
    this.service.registerUser(this.model).subscribe({
      next: (response: any) => {

      },
      error: (err) => {
        AlertifyAlertHandler.AlertifyError(err.error.errors[0].errorMessage);
      },
      complete: () => {
        AlertifyAlertHandler.AlertifySuccess("Kayıt Başarılı");


        this.model.userName = "";
        this.model.firstName = "";
        this.model.lastName = "";
      }
    })
  }
}
