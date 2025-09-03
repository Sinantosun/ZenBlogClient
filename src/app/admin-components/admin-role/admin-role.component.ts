import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { GetRoleModel } from '../../models/UserModels/get-role-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddRoleModel } from '../../models/UserModels/add-role-model';
import { AlertifyAlertHandler } from '../../tools/alertify-alert-handler';
import { UpdateRoleModel } from '../../models/UserModels/update-role-model';
import { SweetAlertHandler } from '../../tools/sweet-alert-handler';
import { APIResponseHandler } from '../../tools/api-response-handler';
declare var bootstrap: any;

@Component({
  selector: 'app-admin-role',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-role.component.html',
  styleUrl: './admin-role.component.css'
})
export class AdminRoleComponent implements OnInit {

  @ViewChild("addCategoryModal") addcategoryModal!: ElementRef;
  @ViewChild("updateCategoryModal") updateCategoryModal!: ElementRef;

  error: string = "";

  roleList: GetRoleModel[] = [];
  addRoleModel: AddRoleModel = new AddRoleModel;
  updateRoleModel: UpdateRoleModel = new UpdateRoleModel;
  constructor(private service: RoleService) {

  }
  ngOnInit(): void {
    this.loadValues();
  }

  loadValues() {
    this.service.GetRoles().subscribe({
      next: (response: any) => {
        this.roleList = response.data;
      }
    })
  }


  addRole() {

    this.service.AddRole(this.addRoleModel).subscribe({
      next: () => {
        this.loadValues();
      }
      , error: (err) => {
        var result = APIResponseHandler.Handle(err);
        this.error = result;
      },
      complete: () => {
        AlertifyAlertHandler.AlertifySuccess("Rol Kaydı Eklendi...!");
        var modal = bootstrap.Modal.getInstance(this.addcategoryModal.nativeElement);
        this.addRoleModel = new AddRoleModel;
        modal.hide();
      }
    })
  }

  update() {

    console.log(this.addRoleModel);
    this.service.UpdateRole(this.updateRoleModel).subscribe({
      next: () => {
        this.loadValues();
      },
      error: (err) => {
        var result = APIResponseHandler.Handle(err);
        this.error = result;
      },
      complete: () => {
        AlertifyAlertHandler.AlertifySuccess("Rol Kaydı Güncellendi...!");
        var modal = bootstrap.Modal.getInstance(this.updateCategoryModal.nativeElement);
        modal.hide();
      }
    })
  }

  getRoleById(id: string) {
    this.error = "";
    this.service.GetRoleById(id).subscribe({
      next: (response: any) => {
        this.updateRoleModel = response.data;
        var modal = new bootstrap.Modal(this.updateCategoryModal.nativeElement);
        modal.show();
      },
      error: () => {
        AlertifyAlertHandler.AlertifyError();
      }
    })
  }

  deleteRole(id: string) {
    SweetAlertHandler.ShowConfirmMessage().then(result => {
      if (result.isConfirmed) {
        this.service.RemoveRole(id).subscribe({
          next: () => {
            this.loadValues();
          }, error: (err) => { AlertifyAlertHandler.AlertifyError(); },
          complete: () => {
            AlertifyAlertHandler.AlertifySuccess("Rol kaydı silnidi...!");
          }
        })
      }
    })
  }

  showRoleCreateModal() {
        this.error = "";
    var modal = new bootstrap.Modal(this.addcategoryModal.nativeElement);
    modal.show();
  }


}
