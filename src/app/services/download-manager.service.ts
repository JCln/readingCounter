import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { IObjectIteratation } from '../Interfaces/IDictionaryManager';
import { IOnOffLoad, IOverAllWOUIInfo } from './../Interfaces/imanage';

@Injectable({
  providedIn: 'root'
})
export class DownloadManagerService {
  getDownloadListInfo = (): IObjectIteratation[] => {
    return [
      { field: 'sizeInKB', header: 'حجم کل تصاویر(KB)', isSelected: true },
      { field: 'imageNumbers', header: 'تعداد تصاویر', isSelected: true },
      { field: 'audioNumbers', header: 'تعداد صوت ها', isSelected: true }
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
  downloadFileInfo = (onOffLoadId: string): Observable<any> => {
    return this.interfaceManagerService.downloadFileInfo(onOffLoadId);
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
  assignToDataSource = (dataSource: IOnOffLoad[]) => {
    this.dataSource = dataSource;
    this.getOverAllSize();
  }
}
