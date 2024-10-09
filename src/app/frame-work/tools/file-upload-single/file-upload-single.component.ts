import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IIOPolicy } from 'interfaces/iserver-manager';
import { CloseTabService } from 'services/close-tab.service';
import { OfflineModeService } from 'services/offline-mode.service';

@Component({
  selector: 'app-file-upload-single',
  templateUrl: './file-upload-single.component.html',
  styleUrls: ['./file-upload-single.component.scss']
})
export class FileUploadSingleComponent {
  @ViewChild("screenshotInput") screenshotInput: ElementRef | null = null;
  choosenFileName: string = '';
  fileNameAfterChoose: string = '';
  progress: number = 0;
  ioPolicy: IIOPolicy;

  _searchByInfo: string = 'اشتراک';

  constructor(
    public offlineModeService: OfflineModeService,
    public closeTabService: CloseTabService
  ) {
    this.classWrapper();
  }
  // The classWrapper is not Overridden
  classWrapper = () => {
    this.closeTabService.fileUploadSingle.searchType = this.offlineModeService.getSearchTypes();
  }

  getLatestOnOffloadId = async () => {
    await this.offlineModeService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.getLatestOnOffloadId,
      {
        searchBy: this.closeTabService.fileUploadSingle.searchBy,
        item: this.closeTabService.fileUploadSingle.item
      }
    ).then(res => this.closeTabService.fileUploadSingleReq.onOffLoadId = res.onOffLoadId)
  }
  onChange(event) {
    const a = document.getElementById('files') as any;
    this.choosenFileName = a.files.item(0).name;
    FileList = event.target.files;
  }
  uploadFile = async (form: NgForm) => {
    if (!this.screenshotInput) {
      throw new Error("this.screenshotInput is null.");
    }
    const fileInput: HTMLInputElement = this.screenshotInput.nativeElement;
    if (fileInput.files) {
      const fileInput: HTMLInputElement = this.screenshotInput.nativeElement;
      if (fileInput.files) {
        this.ioPolicy = await this.offlineModeService.dictionaryWrapperService.getIOPolicy(false);

        if (this.offlineModeService.verificationService.checkVertiticationFileUploadSingle(this.closeTabService.fileUploadSingle, fileInput.files)) {
          const policyVerification = await this.offlineModeService.iOService.policyContent(fileInput.files);
          if (policyVerification) {
            await this.getLatestOnOffloadId();
            this.offlineModeService.postTicketFileUploadSingle(this.closeTabService.fileUploadSingleReq, fileInput.files).subscribe({
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
                    console.log(event.body);
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
    }
  }

}