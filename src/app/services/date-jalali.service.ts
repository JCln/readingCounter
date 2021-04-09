import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateJalaliService {
  constructor() { }

  getCurrentDate = () => {
    return new Date().toLocaleDateString('fa-IR');
  }
}
