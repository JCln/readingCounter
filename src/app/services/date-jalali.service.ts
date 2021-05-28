import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateJalaliService {
  constructor() { }

  getCurrentDate = () => {
    let persianDate = new Date().toLocaleDateString('fa-IR');
    if (persianDate.length == 10)
      return persianDate;

    persianDate = persianDate.substring(0, 5) + 0 + persianDate.substr(5);
    persianDate = persianDate.substring(0, 8) + 0 + persianDate.substr(8);


    return persianDate;
  }
}
