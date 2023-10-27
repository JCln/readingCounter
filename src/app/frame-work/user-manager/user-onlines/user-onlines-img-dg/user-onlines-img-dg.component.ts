import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ENSnackBarColors } from 'interfaces/enums.enum';
import { IIOPolicy } from 'interfaces/iserver-manager';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'services/message.service';
import { UsersAllService } from 'services/users-all.service';

@Component({
  selector: 'app-user-onlines-img-dg',
  templateUrl: './user-onlines-img-dg.component.html',
  styleUrls: ['./user-onlines-img-dg.component.scss']
})
export class UserOnlinesImgDgComponent implements OnInit {
  ioPolicy: IIOPolicy;

  constructor(
    public config: DynamicDialogConfig,
    private usersAllService: UsersAllService,
    public messageService: MessageService
  ) { }

  classWrapper = async () => {
    const a = this.config.data._data;
    this.messageService.toastImageWithCaptionReq.userId = a.userId;
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  @ViewChild("screenshotInput") screenshotInput: ElementRef | null = null;
  choosenFileName: string = '';
  fileNameAfterChoose: string = '';


  progress: number = 0;
  onChange(event) {
    const a = document.getElementById('files') as any;
    this.choosenFileName = a.files.item(0).name;
    FileList = event.target.files;
  }
  uploadFile = async (form: NgForm, isSubscription?: boolean) => {
    if (!this.screenshotInput) {
      throw new Error("this.screenshotInput is null.");
    }
    const fileInput: HTMLInputElement = this.screenshotInput.nativeElement;
    if (fileInput.files) {
      this.ioPolicy = await this.usersAllService.dictionaryWrapperService.getIOPolicy(false);
      if (this.usersAllService.checkVertiticationNotifDirectImage(fileInput.files, this.messageService.toastImageWithCaptionReq, this.ioPolicy)) {
        this.usersAllService.postNotifyDirectImage(fileInput.files, this.messageService.toastImageWithCaptionReq).subscribe({
          next: (event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                break;
              case HttpEventType.ResponseHeader:
                break;
              case HttpEventType.UploadProgress:
                this.progress = Math.round(event.loaded / event.total * 100);
                break;
              case HttpEventType.Response: {
                this.messageService.showSnack(event.body.message, ENSnackBarColors.success);
              }
                setTimeout(() => {
                  this.progress = 0;
                }, 1500);
            }
          },
          error: () => {
            this.progress = 0
          }
        })
      }
    }
  }

}
