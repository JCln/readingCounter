import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CloseTabService } from 'services/close-tab.service';
import { OfflineModeService } from 'services/offline-mode.service';

@Component({
  selector: 'app-off-txt-out',
  templateUrl: './off-txt-out.component.html',
  styleUrls: ['./off-txt-out.component.scss']
})
export class OffTxtOutComponent {
  @ViewChild("screenshotInput") screenshotInput: ElementRef | null = null;
  choosenFileName: string = '';
  fileNameAfterChoose: string = '';
  progress: number = 0;

  uploadForm: any = {
    file: File
  }

  constructor(
    private offlineModeService: OfflineModeService,
    private closeTabService: CloseTabService
  ) { }

  onChange(event) {
    const a = document.getElementById('files') as any;
    this.choosenFileName = a.files.item(0).name;
    FileList = event.target.files;
  }
  uploadFile = (form: NgForm, isSubscription?: boolean) => {
    if (!this.screenshotInput) {
      throw new Error("this.screenshotInput is null.");
    }

    const fileInput: HTMLInputElement = this.screenshotInput.nativeElement;
    if (!fileInput.files) {
      return;
    }

    if (!this.offlineModeService.checkVertitication(fileInput.files, form.value))
      return;

    this.offlineModeService.postTicket().subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          break;
        case HttpEventType.ResponseHeader:
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.offlineModeService.showSuccessMessage(event.body.message);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
      }
    })
  }

}
