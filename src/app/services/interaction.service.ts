import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  saveDataForAppLevel1: any;
  saveDataForAppLevel2: any;
  saveDictionaryForAppLevel2: any;
  saveDataForAppLevel3: any;
  saveDictionaryForAppLevel3: any;
  saveDataForAppLevel4: any;
  saveDictionaryForAppLevel4: any;

  saveDataForCounterState: any;
  saveDictionaryForCounterState: any;

  saveDataForKarbari: any;
  saveDictionaryForKarbari: any;

  saveDataForReadingConfig: any;
  saveDictionaryForReadingConfig: any;

  saveDataForCountry: any;

  saveDataForProvince: any;
  saveDictionaryForProvince: any;

  saveDataForRegion: any;
  saveDictionaryForRegion: any;

  saveDataForZone: any;
  saveDictionaryForZone: any;

  saveDataForZoneBound: any;
  saveDictionaryForZoneBound: any;

  saveDataForAllContacts: any;
  saveDictionaryForAllContacts: any;

  saveDataForEditContacts: any;
  saveDictionaryForEditContacts: any;

  saveDataForForAddContacts: any;
  saveDictionaryForAddContacts: any;

  private refreshSource = new BehaviorSubject<string>('');
  private closeSource = new BehaviorSubject<string>('');

  constructor() { }

  // refrsh config
  getRefreshedPage = (): Observable<string> => {
    return this.refreshSource.asObservable();
  }
  setRefresh = (url: string) => {
    this.refreshSource.next(url);
    setTimeout(() => {
      this.refreshSource.next('');
    }, 500);
  }
  // 
  // close config
  setClose = (url: string) => {
    this.closeSource.next(url);
  }
  getClosedPage = (): Observable<string> => {
    return this.closeSource.asObservable();
  }
  // 
}
