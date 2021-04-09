import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private refreshSource = new BehaviorSubject<string>('');
  private closeSource = new BehaviorSubject<string>('');

  constructor() { }

  // refrsh config
  getRefreshedPage = (): Observable<string> => {
    return this.refreshSource.asObservable();
  }
  setRefresh = (url: string) => {
    this.refreshSource.next(url);
  }
  // 
  // close config
  getClosedPage = (): Observable<string> => {
    return this.closeSource.asObservable();
  }
  // 
}
