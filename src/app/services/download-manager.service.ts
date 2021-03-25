import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { IObjectIteratation } from '../Interfaces/ioverall-config';
import { IOnOffLoad, IOverAllWOUIInfo } from './../Interfaces/imanage';

@Injectable({
  providedIn: 'root'
})
export class DownloadManagerService {
  getDownloadListInfo = (): IObjectIteratation[] => {
    return [
      { field: 'sizeInKB', header: 'حجم کل موارد(KB)', isSelected: true },
      { field: 'imageNumbers', header: 'تعداد تصویر', isSelected: true },
      { field: 'audioNumbers', header: 'تعداد صوت', isSelected: true }
    ];
  }
  dataSource: IOnOffLoad[] = [];
  overAllDetails = {
    sizeInKB: 0,
    numbers: 0,
    imageNumbers: 0,
    audioNumbers: 0
  }
  constructor(
    private interfaceManagerService: InterfaceManagerService
  ) { }

  // calls
  downloadFileInfo = (targetId: string): Observable<any> => {
    return this.interfaceManagerService.downloadFileInfo(targetId);
  }
  downloadForbiddenFileInfo = (targetId: string): Observable<any> => {
    return this.interfaceManagerService.downloadForbiddenFileInfo(targetId);
  }
  downloadFile = (fileRepositoryId: string): Observable<any> => {
    return this.interfaceManagerService.downloadFile(fileRepositoryId);
  }
  // 
  getOverAllSize = () => {
    this.dataSource.filter(item => {
      this.overAllDetails.sizeInKB += item.sizeInByte;
    })
    this.overAllDetails.sizeInKB = this.overAllDetails.sizeInKB / 1000;
  }
  separateImageFiles = (): IOnOffLoad[] => {
    const a = [];
    this.dataSource.filter(item => {
      if (item.extention === '.jpg') {
        a.push(item);
        this.overAllDetails.imageNumbers++;
      }
    })
    return a;
  }
  separateAudioFiles = (): IOnOffLoad[] => {
    const a = [];
    this.dataSource.filter(item => {
      if (item.extention === '.ogg') {
        a.push(item);
        this.overAllDetails.audioNumbers++;
      }
    })
    return a;
  }
  getOverAllInfo = (): IOverAllWOUIInfo => {
    return this.overAllDetails;
  }
  backToDefaultValues = () => {
    this.overAllDetails = {
      sizeInKB: 0,
      numbers: 0,
      imageNumbers: 0,
      audioNumbers: 0
    }
  }
  assignToDataSource = (dataSource: IOnOffLoad[]) => {
    this.dataSource = dataSource;
    this.backToDefaultValues();
    this.getOverAllSize();
  }
}
