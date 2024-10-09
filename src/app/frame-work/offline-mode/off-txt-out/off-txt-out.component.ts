import { CloseTabService } from 'services/close-tab.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { OfflineModeService } from 'services/offline-mode.service';

@Component({
  selector: 'app-off-txt-out',
  templateUrl: './off-txt-out.component.html',
  styleUrls: ['./off-txt-out.component.scss']
})
export class OffTxtOutComponent {
  userCounterReaderDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  @ViewChild("screenshotInput") screenshotInput: ElementRef | null = null;
  choosenFileName: string = '';
  fileNameAfterChoose: string = '';
  progress: number = 0;

  uploadForm: any = {
    file: File
  }
  onChange(event) {
    const a = document.getElementById('files') as any;
    this.choosenFileName = a.files.item(0).name;
    FileList = event.target.files;
  }
  uploadFile = (form: NgForm) => {
    if (!this.screenshotInput) {
      throw new Error("this.screenshotInput is null.");
    }

    const fileInput: HTMLInputElement = this.screenshotInput.nativeElement;
    if (fileInput.files) {

      if (this.offlineModeService.verificationService.checkVertiticationOfflineTxtOut(fileInput.files, this.closeTabService.offlineTextOut)) {
        this.offlineModeService.postTicketOfflineTxtOut(this.closeTabService.offlineTextOut, fileInput.files).subscribe({
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
                this.offlineModeService.utilsService.snackBarMessageSuccess(event.body.message);
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
  getCounterReader = async () => {
    if (this.closeTabService.offlineTextOut.zoneId) {
      this.userCounterReaderDictionary = await this.offlineModeService.dictionaryWrapperService.getUserCounterReaderDictionary(this.closeTabService.offlineTextOut.zoneId);
    }
  }
  getZoneDictionary = async () => {
    this.zoneDictionary = await this.offlineModeService.dictionaryWrapperService.getZoneDictionary();
  }

  constructor(
    public offlineModeService: OfflineModeService,
    public closeTabService: CloseTabService
  ) {
    this.getZoneDictionary();
    this.getCounterReader();
  }


}
