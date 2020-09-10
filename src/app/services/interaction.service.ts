import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private titleSubject = new BehaviorSubject<string>('');

  getPageTitle = (): Observable<string> => {
    return this.titleSubject.asObservable();
  }
  setPageTitle = (title: string) => {
    this.titleSubject.next(title);
  }
  constructor() { }
}
