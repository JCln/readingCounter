import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOnOffLoad, IOverAllWOUIInfo } from 'interfaces/imanage';
import { IObjectIteratation } from 'interfaces/ioverall-config';
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
  downloadFileInfo = (targetId: string): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETID(ENInterfaces.downloadFileInfo, targetId).subscribe(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);

    }
  }
  downloadForbiddenFileInfo = (targetId: string): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETID(ENInterfaces.downloadFileForbidden, targetId).subscribe(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  downloadFile = (fileRepositoryId: string): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETBLOB(ENInterfaces.downloadFileGET, fileRepositoryId).subscribe(res => {
          resolve(res)
        });
      })
    } catch (error) {
      console.error(error);
    }
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
