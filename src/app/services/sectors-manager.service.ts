import { Injectable } from '@angular/core';

import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class SectorsManagerService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  getProvinceDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getProvinceManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }

  getZoneDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getZoneManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getZoneBoundDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getZoneBoundManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getRegionDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getRegionManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getCountryDictionary = (): any => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getCountryDictionary());
    });
  }
  getCountryDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getCountryManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getRegionDictionary = (): any => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getProvinceDictionary());
    });
  }
  getZoneBoundDictionary = (): any => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getZoneDictionary());
    });
  }
  getProvinceDictionary = (): any => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getCountryDictionary());
    });
  }

  getZoneDictionary = (): any => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getRegionDictionary());
    });
  }
}
