import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { IOnOffLoad, IOverAllWOUIInfo } from 'interfaces/itrackings';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadManagerService {
  getDownloadListInfo = (): IObjectIteratation[] => {
    return [
      { field: 'sizeInKB', header: 'حجم (KB)', isSelected: true, readonly: true },
      { field: 'imageNumbers', header: 'تعداد تصویر', isSelected: true, readonly: true },
      { field: 'audioNumbers', header: 'تعداد صوت', isSelected: true, readonly: true }
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
    public ajaxReqWrapperService: AjaxReqWrapperService
  ) { }
  
  downloadFileInfo = (method: ENInterfaces, targetId: string): Promise<any> => {
    return this.ajaxReqWrapperService.getDataSourceById(method, targetId);
  }
  getOverAllSize = () => {
    this.dataSource.filter(item => {
      this.overAllDetails.sizeInKB += item.sizeInByte;
    })
    this.overAllDetails.sizeInKB = this.overAllDetails.sizeInKB / 1000;
  }
  separateImageFiles = (): IOnOffLoad[] => {
    const a = [];
    this.dataSource.filter(item => {
      if (
        item.extention.toLowerCase() === '.jpg' ||
        item.extention.toLowerCase() === '.jpeg' ||
        item.extention.toLowerCase() === '.png'
      ) {
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
  downloadImg = (src: any) => {
    const link = document.createElement('a');
    link.href = src;
    link.target = '_blank';
    link.download = `${new Date().toLocaleDateString()}.jpg`;
    link.click();
  }
}
