import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { AddOrUpdateRoleToUserModel } from '../../models/UserModels/add-or-update-role-to-user-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddRoleModel } from '../../models/UserModels/add-role-model';
import { AddRoleToUserModel } from '../../models/UserModels/add-role-to-user-model';
import { AlertifyAlertHandler } from '../../tools/alertify-alert-handler';

@Component({
  selector: 'app-add-or-update',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-or-update.component.html',
  styleUrl: './add-or-update.component.css'
})
export class AddOrUpdateComponent implements OnInit {

  constructor(private route: ActivatedRoute, private roleService: RoleService) {

  }
  model: AddOrUpdateRoleToUserModel[] = [];

  userId: string = "";

  addRoleModel: AddRoleToUserModel = new AddRoleToUserModel;
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      let id = param["id"];
      this.loadValues(id);
    });
  }

  loadValues(id: string) {
    this.roleService.GetUserAndRoles(id).subscribe(({
      next: (response: any) => {
        this.model = response.data;
        this.userId = id;
        console.log(response)
      }
    }))
  }

  AddRolesToUser() {
    var request = this.model.filter(t => t.isExist).map(i => i.roleName);
    this.addRoleModel = {
      roleList: request,
      userId: this.userId
    }

    this.roleService.AddRoleToUser(this.addRoleModel).subscribe({
      next: () => {

      }
      , error: (err) => {
        console.log(err);
      },
      complete: () => {
        AlertifyAlertHandler.AlertifySuccess("Değişiklikler Kayıt Edildi...!");

      }
    })
  }
}
