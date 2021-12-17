import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { InterfaceManagerService } from 'services/interface-manager.service';

import { MathS } from '../classes/math-s';

@Injectable({
  providedIn: 'root'
})
export class DictionaryWrapperService {

  constructor(
    private interfaceManagerService: InterfaceManagerService
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
  private counterReportByZoneDictionary: any = [];
  private counterStateDictionary: any = [];
  private counterStateByZoneIdDictionary: any = [];
  private counterStateByCodeDictionary: any = [];
  private periodKindDictionary: any = [];
  private qotrDictionary: any = [];
  private roleDictionary: any = [];
  
  private karbariDictionary: any = [];
  private karbariCodeDictionary: any = [];
  private traverseDifferentialDictionary: any = [];

  getkarbariCodeDictionary(): Promise<any> {
    if (!MathS.isNull(this.karbariCodeDictionary))
      return this.karbariCodeDictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.KarbariDictionaryCode).subscribe(res => {
        this.setKarbariDictionaryCode(res);
        resolve(this.karbariCodeDictionary);
      })
    });

  }
  getProvinceDictionary(): Promise<any> {
    if (!MathS.isNull(this.provinceDictionary))
      return this.provinceDictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.ProvinceDICTIONARY).subscribe(res => {
        this.setProvinceDictionary(res);
        resolve(this.provinceDictionary);
      })
    });

  }
  getRegionDictionary(): Promise<any> {
    if (!MathS.isNull(this.regionDictionary))
      return this.regionDictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.RegionDICTIONARY).subscribe(res => {
        this.setRegionDictionary(res);
        resolve(this.regionDictionary);
      })
    });

  }
  getZoneDictionary(): Promise<any> {
    if (!MathS.isNull(this.zoneDictionary))
      return this.zoneDictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.ZoneDICTIONARY).subscribe(res => {
        this.setZoneDictionary(res);
        resolve(this.zoneDictionary);
      })
    });

  }
  getCountryDictionary(): Promise<any> {
    if (!MathS.isNull(this.countryDictionary))
      return this.countryDictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.CountryDICTIONARY).subscribe(res => {
        this.setCountryDictionary(res);
        resolve(this.countryDictionary);
      })
    });

  }
  getAuthLev1Dictionary(): Promise<any> {
    if (!MathS.isNull(this.authLev1Dictionary))
      return this.authLev1Dictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.AuthLevel1DICTIONARY).subscribe(res => {
        this.setAuthLev1Dictionary(res);
        resolve(this.authLev1Dictionary);
      })
    });

  }
  getAuthLev2Dictionary(): Promise<any> {
    if (!MathS.isNull(this.authLev2Dictionary))
      return this.authLev2Dictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.AuthLevel2DICTIONARY).subscribe(res => {
        this.setAuthLev2Dictionary(res);
        resolve(this.authLev2Dictionary);
      })
    });

  }
  getAuthLev3Dictionary(): Promise<any> {
    if (!MathS.isNull(this.authLev3Dictionary))
      return this.authLev3Dictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.AuthLevel3DICTIONARY).subscribe(res => {
        this.setAuthLev3Dictionary(res);
        resolve(this.authLev3Dictionary);
      })
    });

  }
  getAuthLev4Dictionary(): Promise<any> {
    if (!MathS.isNull(this.authLev4Dictionary))
      return this.authLev4Dictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.AuthLevel4DICTIONARY).subscribe(res => {
        this.setAuthLev4Dictionary(res);
        resolve(this.authLev4Dictionary);
      })
    });

  }
  getTraverseDifferentialDictionary(): Promise<any> {
    if (!MathS.isNull(this.traverseDifferentialDictionary))
      return this.traverseDifferentialDictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.ListTraverseDifferentialDictionary).subscribe(res => {
        this.setTraverseDiffDictionary(res);
        resolve(this.traverseDifferentialDictionary);
      })
    });

  }
  getCounterReportDictionary(): Promise<any> {
    if (!MathS.isNull(this.counterReportDictionary))
      return this.counterReportDictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.CounterReportDICTIONARY).subscribe(res => {
        this.setCounterReportDictionary(res);
        resolve(this.counterReportDictionary);
      })
    });
  }
  getCounterReportByZoneIdDictionary(zoneId: number): Promise<any> {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(ENInterfaces.CounterReportByZoneIdDICTIONARY, zoneId).subscribe(res => {
        this.setCounterReportByZoneDictionary(res);
        resolve(this.counterReportByZoneDictionary);
      })
    });
  }
  getCounterStateDictionary(): Promise<any> {
    if (!MathS.isNull(this.counterStateDictionary))
      return this.counterStateDictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.counterStateDictionary).subscribe(res => {
        this.setCounterStateDictionary(res);
        resolve(this.counterStateDictionary);
      })
    });

  }
  getCounterStateByZoneIdDictionary(zoneId: number): Promise<any> {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(ENInterfaces.counterStateDictionaryByZoneId, zoneId).subscribe(res => {
        this.setCounterStateByZoneIdDictionary(res);
        resolve(this.counterStateByZoneIdDictionary);
      })
    })
  }
  getCounterStateByCodeDictionary(zoneId: number): Promise<any> {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(ENInterfaces.counterStateDictionaryByCode, zoneId).subscribe(res => {
        this.setCounterStateByCodeDictionary(res);
        resolve(this.counterStateByCodeDictionary);
      })
    });
  }
  getPeriodKindDictionary(): Promise<any> {
    if (!MathS.isNull(this.periodKindDictionary))
      return this.periodKindDictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.readingPeriodKindDictionary).subscribe(res => {
        this.setPeriodKindDictionary(res);
        resolve(this.periodKindDictionary);
      })
    });

  }
  getReadingPeriodDictionary = (kindId: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(ENInterfaces.readingPeriodByKindDictionary, kindId).toPromise().then((res: any) => {
        resolve(res)
      })
    });
  }
  getKarbariDictionary(): Promise<any> {
    if (!MathS.isNull(this.karbariDictionary))
      return this.karbariDictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.KarbariDictionary).subscribe(res => {
        this.setKarbariDictionary(res);
        resolve(this.karbariDictionary);
      })
    });

  }
  getQotrDictionary(): Promise<any> {
    if (!MathS.isNull(this.qotrDictionary))
      return this.qotrDictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.QotrDictionary).subscribe(res => {
        this.setQotrDictionary(res);
        resolve(this.qotrDictionary);
      })
    });

  }
  getRoleDictionary(): Promise<any> {
    if (!MathS.isNull(this.roleDictionary))
      return this.roleDictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.RoleDICTIONARY).subscribe(res => {
        this.setRoleDictionary(res);
        resolve(this.roleDictionary);
      })
    });

  }
  getZoneBoundDictionary(): Promise<any> {
    if (!MathS.isNull(this.zoneBoundDictionary))
      return this.zoneBoundDictionary;
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.ZoneBoundDICTIONARY).subscribe(res => {
        this.setZoneBoundDictionary(res);
        resolve(this.zoneBoundDictionary);
      })
    });

  }


  private setKarbariDictionaryCode(v: any) {
    this.karbariCodeDictionary = v;
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
  private setCounterReportByZoneDictionary(v: any) {
    this.counterReportByZoneDictionary = v;
  }
  private setCounterStateDictionary(v: any) {
    this.counterStateDictionary = v;
  }
  private setCounterStateByZoneIdDictionary(v: any) {
    this.counterStateByZoneIdDictionary = v;
  }
  private setCounterStateByCodeDictionary(v: any) {
    this.counterStateByCodeDictionary = v;
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
  private setTraverseDiffDictionary(v: any) {
    this.traverseDifferentialDictionary = v;
  }

  cleanDictionaries = () => {
    this.provinceDictionary = [];
    this.regionDictionary = [];
    this.zoneDictionary = [];
    this.zoneBoundDictionary = [];
    this.countryDictionary = [];
    this.authLev1Dictionary = [];
    this.authLev2Dictionary = [];
    this.authLev3Dictionary = [];
    this.authLev4Dictionary = [];
    this.counterReportDictionary = [];
    this.counterReportByZoneDictionary = [];
    this.counterStateDictionary = [];
    this.counterStateByZoneIdDictionary = [];
    this.counterStateByCodeDictionary = [];
    this.periodKindDictionary = [];
    this.karbariDictionary = [];
    this.qotrDictionary = [];
    this.roleDictionary = [];
    this.karbariCodeDictionary = [];
    this.traverseDifferentialDictionary = [];
  }
  cleanSingleDictionary = (dicName: string) => {
    this[dicName] = [];
  }
}
