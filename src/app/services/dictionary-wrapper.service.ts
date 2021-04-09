import { Injectable } from '@angular/core';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class DictionaryWrapperService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService
  ) { }

  private provinceDictionary: any = [];
  private regionDictionary: any = [];
  private zoneDictionary: any = [];
  private zoneBoundDictionary: any = [];
  private countryDictionary: any = [];

  private authLev1Dictionary: any = [];
  private authLev2Dictionary: any = [];
  private authLev3Dictionary: any = [];
  private authLev4Dictionary: any = [];

  private counterReportDictionary: any = [];
  private counterStateDictionary: any = [];
  private counterStateByZoneIdDictionary: any = [];
  private periodKindDictionary: any = [];
  private karbariDictionary: any = [];
  private qotrDictionary: any = [];
  private roleDictionary: any = [];

  getProvinceDictionary(): Promise<any> {
    if (this.utilsService.isNull(this.provinceDictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getProvinceDictionaryManager().subscribe(res => {
          this.setProvinceDictionary(res);
          resolve(this.provinceDictionary);
        })
      });
    }
    return this.provinceDictionary;
  }
  getRegionDictionary(): Promise<any> {
    if (this.utilsService.isNull(this.regionDictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getRegionDictionaryManager().subscribe(res => {
          this.setRegionDictionary(res);
          resolve(this.regionDictionary);
        })
      });
    }
    return this.regionDictionary;
  }
  getZoneDictionary(): Promise<any> {
    if (this.utilsService.isNull(this.zoneDictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getZoneDictionaryManager().subscribe(res => {
          this.setZoneDictionary(res);
          resolve(this.zoneDictionary);
        })
      });
    }
    return this.zoneDictionary;
  }
  getCountryDictionary(): Promise<any> {
    if (this.utilsService.isNull(this.countryDictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getCountryDictionaryManager().subscribe(res => {
          this.setCountryDictionary(res);
          resolve(this.countryDictionary);
        })
      });
    }
    return this.countryDictionary;
  }
  getAuthLev1Dictionary(): Promise<any> {
    if (this.utilsService.isNull(this.authLev1Dictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getAuthLevel1DictionaryManager().subscribe(res => {
          this.setAuthLev1Dictionary(res);
          resolve(this.authLev1Dictionary);
        })
      });
    }
    return this.authLev1Dictionary;
  }
  getAuthLev2Dictionary(): Promise<any> {
    if (this.utilsService.isNull(this.authLev2Dictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getAuthLevel2DictionaryManager().subscribe(res => {
          this.setAuthLev2Dictionary(res);
          resolve(this.authLev2Dictionary);
        })
      });
    }
    return this.authLev2Dictionary;
  }
  getAuthLev3Dictionary(): Promise<any> {
    if (this.utilsService.isNull(this.authLev3Dictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getAuthLevel3DictionaryManager().subscribe(res => {
          this.setAuthLev3Dictionary(res);
          resolve(this.authLev3Dictionary);
        })
      });
    }
    return this.authLev3Dictionary;
  }
  getAuthLev4Dictionary(): Promise<any> {
    if (this.utilsService.isNull(this.authLev4Dictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getAuthLevel4DictionaryManager().subscribe(res => {
          this.setAuthLev4Dictionary(res);
          resolve(this.authLev4Dictionary);
        })
      });
    }
    return this.authLev4Dictionary;
  }
  getCounterReportDictionary(): Promise<any> {
    if (this.utilsService.isNull(this.counterReportDictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getCounterReportDictionary().subscribe(res => {
          this.setCounterReportDictionary(res);
          resolve(this.counterReportDictionary);
        })
      });
    }
    return this.counterReportDictionary;
  }
  getCounterStateDictionary(): Promise<any> {
    if (this.utilsService.isNull(this.counterStateDictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getCounterStateDictionary().subscribe(res => {
          this.setCounterStateDictionary(res);
          resolve(this.counterStateDictionary);
        })
      });
    }
    return this.counterStateDictionary;
  }
  getCounterStateByZoneIdDictionary(zoneId: number): Promise<any> {
    if (this.utilsService.isNull(this.counterStateByZoneIdDictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getCounterStateByZoneIdDictionary(zoneId).subscribe(res => {
          this.setCounterStateByZoneIdDictionary(res);
          resolve(this.counterStateByZoneIdDictionary);
        })
      });
    }
    return this.counterStateDictionary;
  }
  getPeriodKindDictionary(): Promise<any> {
    if (this.utilsService.isNull(this.periodKindDictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getReadingPeriodKindManagerDictionary().subscribe(res => {
          this.setPeriodKindDictionary(res);
          resolve(this.periodKindDictionary);
        })
      });
    }
    return this.periodKindDictionary;
  }
  getKarbariDictionary(): Promise<any> {
    if (this.utilsService.isNull(this.karbariDictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getKarbariDictionary().subscribe(res => {
          this.setKarbariDictionary(res);
          resolve(this.karbariDictionary);
        })
      });
    }
    return this.karbariDictionary;
  }
  getQotrDictionary(): Promise<any> {
    if (this.utilsService.isNull(this.qotrDictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getQotrDictionary().subscribe(res => {
          this.setQotrDictionary(res);
          resolve(this.qotrDictionary);
        })
      });
    }
    return this.qotrDictionary;
  }
  getRoleDictionary(): Promise<any> {
    if (this.utilsService.isNull(this.roleDictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getRoleDictionaryManager().subscribe(res => {
          this.setRoleDictionary(res);
          resolve(this.roleDictionary);
        })
      });
    }
    return this.roleDictionary;
  }
  getZoneBoundDictionary(): Promise<any> {
    if (this.utilsService.isNull(this.zoneBoundDictionary)) {
      return new Promise((resolve) => {
        this.interfaceManagerService.getZoneBoundDictionaryManager().subscribe(res => {
          this.setZoneBoundDictionary(res);
          resolve(this.zoneBoundDictionary);
        })
      });
    }
    return this.zoneBoundDictionary;
  }


  private setProvinceDictionary(v: any) {
    this.provinceDictionary = v;
  }
  private setRegionDictionary(v: any) {
    this.regionDictionary = v;
  }
  private setZoneDictionary(v: any) {
    this.zoneDictionary = v;
  }
  private setZoneBoundDictionary(v: any) {
    this.zoneBoundDictionary = v;
  }
  private setCountryDictionary(v: any) {
    this.countryDictionary = v;
  }
  private setAuthLev1Dictionary(v: any) {
    this.authLev1Dictionary = v;
  }
  private setAuthLev2Dictionary(v: any) {
    this.authLev2Dictionary = v;
  }
  private setAuthLev3Dictionary(v: any) {
    this.authLev3Dictionary = v;
  }
  private setAuthLev4Dictionary(v: any) {
    this.authLev4Dictionary = v;
  }
  private setCounterReportDictionary(v: any) {
    this.counterReportDictionary = v;
  }
  private setCounterStateDictionary(v: any) {
    this.counterStateDictionary = v;
  }
  private setCounterStateByZoneIdDictionary(v: any) {
    this.counterStateByZoneIdDictionary = v;
  }
  private setPeriodKindDictionary(v: any) {
    this.periodKindDictionary = v;
  }
  private setKarbariDictionary(v: any) {
    this.karbariDictionary = v;
  }
  private setQotrDictionary(v: any) {
    this.qotrDictionary = v;
  }
  private setRoleDictionary(v: any) {
    this.roleDictionary = v;
  }


}
