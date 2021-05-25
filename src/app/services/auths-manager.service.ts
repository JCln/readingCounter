import { Injectable } from '@angular/core';

import { ENInterfaces } from '../Interfaces/en-interfaces.enum';
import { IDictionaryManager } from '../Interfaces/ioverall-config';
import { ConverterService } from './converter.service';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthsManagerService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private converterService: ConverterService
  ) { }

  getAuth1DataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.AuthLevel1GET).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(error);
    }
  }
  getAuth4DataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.AuthLevel4GET).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(error);
    }
  }
  getAuth3DataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.AuthLevel3GET).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(error);
    }
  }
  getAuth2DataSource = (): any => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.AuthLevel2GET).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(error);
    }
  }

  getAuthLevel1Dictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getAuthLev1Dictionary();
  }
  getAuthLevel2Dictionary = (): any => {
    return this.dictionaryWrapperService.getAuthLev2Dictionary();
  }
  getAuthLevel3Dictionary = (): any => {
    return this.dictionaryWrapperService.getAuthLev3Dictionary();
  }
  convertIdToTitle = (dataSource: any, dictionary: IDictionaryManager[], toConvert: string) => {
    this.converterService.convertIdToTitle(dataSource, dictionary, toConvert);
  }

}
