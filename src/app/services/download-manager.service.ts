import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { IOnOffLoad, IOverAllWOUIInfo } from 'interfaces/itrackings';
import { InterfaceManagerService } from 'services/interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadManagerService {
  getDownloadListInfo = (): IObjectIteratation[] => {
    return [
      { field: 'sizeInKB', header: 'حجم کل موارد(KB)', isSelected: true, readonly: true },
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
    private interfaceManagerService: InterfaceManagerService
  ) { }

  // calls
  downloadFileInfo = (method: ENInterfaces, targetId: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETID(method, targetId).subscribe(res => {
        resolve(res)
      })
    });
  }
  downloadFile = (fileRepositoryId: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETBLOB(ENInterfaces.downloadFileGET, fileRepositoryId).subscribe(res => {
        resolve(res)
      });
    })
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
      if (item.extention === '.jpg' || item.extention === '.jpeg'
        || item.extention === '.JPG' || item.extention === '.JPEG') {
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
