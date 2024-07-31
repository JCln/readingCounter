import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSnackBarColors, EN_messages } from 'interfaces/enums.enum';
import { IAPK } from 'interfaces/inon-manage';
import { ApkService } from 'services/apk.service';
import { CloseTabService } from 'services/close-tab.service';
import { OutputManagerService } from 'services/output-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-apk',
  templateUrl: './apk.component.html',
  styleUrls: ['./apk.component.scss']
})
export class ApkComponent extends FactoryONE {
  @ViewChild("screenshotInput") screenshotInput: ElementRef | null = null;
  choosenFileName: string = '';
  fileNameAfterChoose: string = '';
  progress: number = 0;

  uploadForm: any = {
    versionCode: null,
    versionName: '',
    description: '',
    file: File
  }

  constructor(
    private apkService: ApkService,
    public closeTabService: CloseTabService,
    private outputManagerService: OutputManagerService
  ) {
    super();
  }

  downloadAPK = async () => {
    const a = await this.apkService.ajaxReqWrapperService.getBlob(ENInterfaces.APKLast);
    this.outputManagerService.downloadFile(a, '.apk');
  }
  downloadPrevious = async (event: IAPK) => {
    const res = await this.apkService.ajaxReqWrapperService.getBlobById(ENInterfaces.downloadFileGET, event.fileRepositoryId);
    this.outputManagerService.downloadFile(res, '.apk');    
  }
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

    if (!this.apkService.checkVertitication(fileInput.files, form.value))
      return;

    this.apkService.postTicket().subscribe({
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
            this.apkService.showSuccessMessage(event.body.message, ENSnackBarColors.success);
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
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh)
      this.closeTabService.saveDataForAPKManager = null;

    if (this.closeTabService.saveDataForAPKManager === null || !this.closeTabService.saveDataForAPKManager) {
      this.closeTabService.saveDataForAPKManager = await this.apkService.ajaxReqWrapperService.getDataSource(ENInterfaces.APKPreList);
    }
  }
  getUserRole = (): boolean => {
    return this.apkService.utilsService.getIsAdminRole();
  }
  removeRow = async (dataSource: number) => {
    if (this.getUserRole()) {
      if (await this.apkService.firstConfirmDialog('نام نسخه: ' + dataSource['dataSource'].versionName + '،  نسخه: ' + dataSource['dataSource'].versionCode)) {
        const a = await this.apkService.ajaxReqWrapperService.postDataSourceById(ENInterfaces.APKRemove, dataSource['dataSource'].id);
        if (a) {
          this.apkService.showSuccessMessage(a.message, ENSnackBarColors.success);
          this.refreshTable();
        }
      }

    } else {
      this.apkService.showSuccessMessage(EN_messages.access_denied, ENSnackBarColors.warn);
    }
  }


}