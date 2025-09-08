import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APIResponseHandler } from '../../tools/api-response-handler';
import { SweetAlertHandler } from '../../tools/sweet-alert-handler';
import { CreateContactInfoModel } from '../../models/ContactInfoModels/create-contact-info-model';
import { GetContactInfoModel } from '../../models/ContactInfoModels/get-contact-info-model';
import { UpdateContactInfoModel } from '../../models/ContactInfoModels/update-contact-info-model';
import { ContactInfoService } from '../../services/contactinfo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare const alertify: any
declare var bootstrap: any;


@Component({
  selector: 'app-admin-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-contact.component.html',
  styleUrl: './admin-contact.component.css'
})
export class AdminContactComponent implements OnInit {

  @ViewChild('updateContactInfoModal') updateModal!: ElementRef;
  @ViewChild('addContactInfoModal') createModal!: ElementRef;

  model: GetContactInfoModel[] = [];
  addContactInfoModel: CreateContactInfoModel = new CreateContactInfoModel;
  updateContactInfoModel: UpdateContactInfoModel = new UpdateContactInfoModel;

  errors: any[] = [];

  mapUrl: SafeResourceUrl | undefined;

  constructor(private ContactInfoService: ContactInfoService, private santezier: DomSanitizer) {

  }
  ngOnInit(): void {
    this.loadContactInfo();
  }

  loadContactInfo() {
    this.ContactInfoService.GetAll().subscribe(({
      next: (response: any) => {
        this.model = response.data;

        if (this.model.length > 0) { 
          this.mapUrl = this.santezier.bypassSecurityTrustResourceUrl(this.model[0].mapURL); //dikkat Bu method aslında Angular’ın güvenlik mekanizmasını devre dışı bırakıyor. XSS açıklarından kaçımak için dikkatli kullanılmalı. 
        }
      },
      error: (err) => { console.log(err); }
    }));
  }

  getContactInfoById(id: string) {
    this.ContactInfoService.GetContactInfoById(id).subscribe({
      next: (response: any) => {
        this.updateContactInfoModel = response.data;
        const modal = new bootstrap.Modal(this.updateModal.nativeElement);
        modal.show();
      },
      error: (err) => { console.log(err); }
    });
  }

  getErrorFor(prop: string) {
    return this.errors.filter(t => t.propertyName === prop) ?? [];
  }
  addContactInfo() {
    this.ContactInfoService.AddContactInfo(this.addContactInfoModel).subscribe({
      next: () => {
        this.loadContactInfo();
      },
      error: (response) => {
        this.errors = response.error.errors;
      },
      complete: () => {
        alertify.success("Kategori Eklendi...!");
        this.addContactInfoModel = new CreateContactInfoModel;
        const modalInstance = bootstrap.Modal.getInstance(this.createModal.nativeElement);
        modalInstance?.hide();
      }
    })
  }

  updateContactInfo() {
    this.ContactInfoService.UpdateContactInfo(this.updateContactInfoModel).subscribe({
      next: (res) => {
        const modalInstance = bootstrap.Modal.getInstance(this.updateModal.nativeElement);
        modalInstance?.hide();
      },
      error: (response) => {
        this.errors = response.error.errors;
      },
      complete: () => {
        alertify.success("Kategori Güncellendi...!");
        this.loadContactInfo();
      }
    });
  }

  removeContactInfo(id: string) {
    SweetAlertHandler.ShowConfirmMessage().then((result) => {
      if (result.isConfirmed) {
        this.ContactInfoService.deleteContactInfo(id).subscribe({
          next: () => {
            this.loadContactInfo();
          },
          error: (err) => {

          },
          complete: () => {
            alertify.success("Kayıt Silindi...!");
          }
        })
      }
    });
  }


  showCreateModal() {
    this.errors = [];
    this.addContactInfoModel = new CreateContactInfoModel;
    const modal = new bootstrap.Modal(this.createModal.nativeElement);
    modal.show();
  }
}
