import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    private offlineModeService: OfflineModeService
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
    if (fileInput.files) {

      if (this.offlineModeService.checkVertiticationOfflineTxtOut(fileInput.files, form.value)) {
        this.offlineModeService.postTicketOfflineTxtOut().subscribe({
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
                this.offlineModeService.showSuccessMessage(event.body.message);
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
