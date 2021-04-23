import { Injectable } from '@angular/core';

import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthsManagerService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  getAuth1DataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getAuthLevel1Manager().subscribe(res => {
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
        this.interfaceManagerService.getAuthLevel4Manager().subscribe(res => {
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
        this.interfaceManagerService.getAuthLevel3Manager().subscribe(res => {
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
        this.interfaceManagerService.getAuthLevel2Manager().subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(error);
    }
  }

  getAuthLevel1Dictionary = (): any => {
    try {
      return new Promise((resolve) => {
        resolve(this.dictionaryWrapperService.getAuthLev1Dictionary());
      });
    } catch (error) {
      console.error(error);
    }
  }

  getAuthLevel2Dictionary = (): any => {
    try {
      return new Promise((resolve) => {
        resolve(this.dictionaryWrapperService.getAuthLev2Dictionary());
      });

    } catch (error) {
      console.error(error);
    }
  }
  getAuthLevel3Dictionary = (): any => {
    try {
      return new Promise((resolve) => {
        resolve(this.dictionaryWrapperService.getAuthLev3Dictionary());
      });
    } catch (error) {
      console.error(error);
    }
  }

}
