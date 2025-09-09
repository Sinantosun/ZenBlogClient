import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CreateMessageModel } from '../../models/MessageModels/create-message-model';
import { AlertifyAlertHandler } from '../../tools/alertify-alert-handler';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactInfoService } from '../../services/contactinfo.service';
import { GetContactInfoModel } from '../../models/ContactInfoModels/get-contact-info-model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-message',
  imports: [FormsModule, CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {
  constructor(private service: MessageService, private contactinfoService: ContactInfoService, private domSantezer: DomSanitizer) {

  }
  @ViewChild("successDiv") successDivRef!: ElementRef;
  @ViewChild("errorDiv") errorDivRef!: ElementRef;
  loading: boolean = false;
  errors: any[] = [];
  model: CreateMessageModel = new CreateMessageModel;
  contactInfoModel: GetContactInfoModel[] = [];
  resourceURL : SafeResourceUrl = "";
  ngOnInit(): void {
    this.loadContactInfo();
  }

  loadContactInfo() {
    this.contactinfoService.GetAll().subscribe({
      next: (res: any) => {
        this.contactInfoModel = res.data;
        this.resourceURL = this.domSantezer.bypassSecurityTrustResourceUrl(res.data[0].mapURL); //dikkat Bu method aslında Angular’ın güvenlik mekanizmasını devre dışı bırakıyor. XSS açıklarından kaçımak için dikkatli kullanılmalı. 
      }
    })
  }


  getErrorFor(prop: string) {
    return this.errors.filter(x => x.propertyName === prop) ?? [];
  }

  sendMessage() {
    this.loading = true;
    this.service.SendMessage(this.model).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (res) => {
        this.errors = res.error.errors;
        this.loading = false;
        this.errorDivRef.nativeElement.style.display = 'block';
        this.successDivRef.nativeElement.style.display = 'none';
      },
      complete: () => {
        this.successDivRef.nativeElement.style.display = 'block';
        this.errorDivRef.nativeElement.style.display = 'none';
        this.loading = false;
        this.errors = [];
        this.model = new CreateMessageModel;

        setTimeout(() => {
          this.successDivRef.nativeElement.style.display = 'none';
        }, 1000);
      }
    })
  }
}
