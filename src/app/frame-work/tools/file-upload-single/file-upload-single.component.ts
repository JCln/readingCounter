import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
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

  _searchByInfo: string = 'اشتراک';

  constructor(
    public offlineModeService: OfflineModeService
  ) {
    this.classWrapper();
  }
  // The classWrapper is not Overridden
  classWrapper = () => {
    this.offlineModeService.fileUploadSingle.searchType = this.offlineModeService.getSearchTypes();
  }

  getLatestOnOffloadId = async () => {
    await this.offlineModeService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.getLatestOnOffloadId,
      {
        searchBy: this.offlineModeService.fileUploadSingle.searchBy,
        item: this.offlineModeService.fileUploadSingle.item
      }
    ).then(res => this.offlineModeService.fileUploadSingleReq.onOffLoadId = res.onOffLoadId)
  }
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

      this.offlineModeService.fileUploadSingleForm = fileInput.files;
      if (this.offlineModeService.checkVertiticationFileUploadSingle()) {
        await this.getLatestOnOffloadId();
        this.offlineModeService.postTicketFileUploadSingle(fileInput.files).subscribe((event: HttpEvent<any>) => {
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
              this.offlineModeService.showSuccessMessage(event.body.message);
            }
              setTimeout(() => {
                this.progress = 0;
              }, 1500);
          }
        })
      }
    }
  }

}
