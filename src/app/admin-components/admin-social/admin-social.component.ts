import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetSocialListModel } from '../../models/SocialModels/get-social-list-model';
import { CreateSocialMedia } from '../../models/SocialModels/create-social-model';
import { UpdateSocialModel } from '../../models/SocialModels/update-social-model';
import { SweetAlertHandler } from '../../tools/sweet-alert-handler';
import { APIResponseHandler } from '../../tools/api-response-handler';
import { SocialService } from '../../services/social.service';
declare const alertify: any
declare var bootstrap: any;

@Component({
  selector: 'app-admin-social',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-social.component.html',
  styleUrl: './admin-social.component.css'
})
export class AdminSocialComponent {
  @ViewChild('updatesocialModal') updateModal!: ElementRef;
  @ViewChild('addsocialModal') createModal!: ElementRef;

  model: GetSocialListModel[] = [];
  addsocialModel: CreateSocialMedia = new CreateSocialMedia;
  updatesocialModel: UpdateSocialModel = new UpdateSocialModel;
  error: string = "";
  erros: any[] = [];
  constructor(private socialService: SocialService) {

  }
  ngOnInit(): void {
    this.loadSocial();
  }
  loadSocial() {
    this.socialService.GetSocial().subscribe(({
      next: (response: any) => {
        console.log(response);
        this.model = response.data;
      },
      error: (err) => { console.log(err); }
    }));
  }

  getErrorsFor(prop: string) {
    return this.erros?.filter(x => x.propertyName === prop) ?? [];
  }

  getSocialById(id: string) {
    this.error = "";
    this.socialService.GetByIdSocial(id).subscribe({
      next: (response: any) => {
        this.updatesocialModel = response.data;
        this.updatesocialModel.id = id;
        const modal = new bootstrap.Modal(this.updateModal.nativeElement);
        modal.show();
      },
      error: (err) => { console.log(err); }
    });
  }

  addSocial() {
    this.socialService.CreateSocial(this.addsocialModel).subscribe({
      next: () => {
        this.loadSocial();
      },
      error: (response) => {
        this.erros = response.error.errors;
        this.handleErr(response);
      },
      complete: () => {
        alertify.success("Kategori Eklendi...!");
        this.error = "";
        this.addsocialModel = new CreateSocialMedia;
        const modalInstance = bootstrap.Modal.getInstance(this.createModal.nativeElement);
        modalInstance?.hide();
      }
    })
  }

  updateSocial() {
    this.socialService.UpdateSocial(this.updatesocialModel).subscribe({
      next: (res) => {
        const modalInstance = bootstrap.Modal.getInstance(this.updateModal.nativeElement);
        modalInstance?.hide();
      },
      error: (response) => {
        this.handleErr(response);
        this.erros = response.error.errors;
      },
      complete: () => {
        alertify.success("Kategori Güncellendi...!");
        this.loadSocial();
      }
    });
  }

  removesocial(id: string) {
    SweetAlertHandler.ShowConfirmMessage().then((result) => {
      if (result.isConfirmed) {
        this.socialService.RemoveSocial(id).subscribe({
          next: () => {
            this.loadSocial();
          },
          error: (err) => {
            this.handleErr(err);
          },
          complete: () => {
            alertify.success("Kayıt Silindi...!");
          }
        })
      }
    });
  }

  private handleErr(response: any) {
    var handlerResponse = APIResponseHandler.Handle(response);
    if (handlerResponse) {
      this.error = handlerResponse;
    }
  }

  showCreateModal() {
    this.error = "";
    this.addsocialModel = new CreateSocialMedia;
    const modal = new bootstrap.Modal(this.createModal.nativeElement);
    modal.show();
  }
}
