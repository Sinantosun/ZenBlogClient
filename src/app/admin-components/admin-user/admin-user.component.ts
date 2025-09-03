import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GetUserListModel } from '../../models/UserModels/get-user-list-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-user',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent implements OnInit {

  userModel: GetUserListModel[] = [];
  constructor(private service: UserService) {

  }

  ngOnInit(): void {
    this.service.GetUsers().subscribe({
      next: (response: any) => {
        this.userModel = response.data;
      }
    })
  }


}
