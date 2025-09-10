import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetMessageListModel } from '../../models/MessageModels/get-messsage-model';
import { AlertifyAlertHandler } from '../../tools/alertify-alert-handler';
import { SweetAlertHandler } from '../../tools/sweet-alert-handler';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-message',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-message.component.html',
  styleUrl: './admin-message.component.css'
})
export class AdminMessageComponent implements OnInit {

  @ViewChild("messageDetailModal") messageDetailModalRef!: ElementRef;

  model: GetMessageListModel[] = [];
  messageDetailModel: GetMessageListModel = new GetMessageListModel;
  selectedTab: string = "";

  constructor(private service: MessageService) {

  }
  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.selectedTab = "Tüm Liste"
    this.model = [];
    this.service.GetMessages().subscribe({
      next: (result: any) => {
        this.model = result.data;
      },
      error: (err) => { console.log(err) }
    })
  }

  GetUnReadMessage() {
    this.selectedTab = "Okunmayan Liste"
    this.model = [];
    this.service.GetUnReadMessages().subscribe({
      next: (result: any) => {
        this.model = result.data;
      }
    })
  }

  GetReadMessage() {
    this.selectedTab = "Okunan Liste"
    this.model = [];
    this.service.GetReadMessages().subscribe({
      next: (result: any) => {
        this.model = result.data;
      }
    })
  }

  deleteMessage(id: string) {
    SweetAlertHandler.ShowConfirmMessage("Mesaj Silinecek","Bu İşlem geri alınmaz mesaj silinsin mi?").then((result) => {
      if (result.isConfirmed) {
        this.service.DeleteMesssage(id).subscribe({
          next: () => {

          },
          error: (err) => {
            console.log(err);
            AlertifyAlertHandler.AlertifyError("Mesaj Silinemedi...!")
          },
          complete: () => {
            AlertifyAlertHandler.AlertifySuccess("Mesaj Silindi...!")
            switch (this.selectedTab) {
              case "Tüm Liste":
                this.getList();
                break;
              case "Okunan Liste":
                this.GetReadMessage();
                break;
              case "Okunmayan Liste":
                this.GetUnReadMessage();
                break;
            }
          }
        })
      }
    })

  }

  ShowMessageDetail(item: GetMessageListModel) {
    var modal = new bootstrap.Modal(this.messageDetailModalRef.nativeElement);
    modal.show();
    this.messageDetailModel = item;
  }

  ChangeMessageStatus(id: string, status: boolean) {
    let text = "";
    if (status == true) { text = "Okunmadı" } else { text = "Okundu" }
    SweetAlertHandler.ShowConfirmMessage("Uyarı", `Mesaj Kaydını ${text} Güncellemek istediğinize Emin Misiniz?`).then((result) => {
      if (result.isConfirmed) {
        this.service.changeMessageStatus(id).subscribe({
          next: () => {

          },
          error: (err) => {
            console.log(err);
            AlertifyAlertHandler.AlertifyError("Kayıt Güncellenemedi...!")
          },
          complete: () => {
            AlertifyAlertHandler.AlertifySuccess("Kayıt Güncelelndi...!")
            switch (this.selectedTab) {
              case "Tüm Liste":
                this.getList();
                break;
              case "Okunan Liste":
                this.GetReadMessage();
                break;
              case "Okunmayan Liste":
                this.GetUnReadMessage();
                break;
            }
          }
        })
      }
    })
  }


}
