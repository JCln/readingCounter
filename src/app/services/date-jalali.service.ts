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
    // add 0 to month
    if (persianDate.split('/')[1].length == 1) {
      persianDate = persianDate.substring(0, 5) + 0 + persianDate.substr(5);
    }
    // add 0 to day
    if (persianDate.split('/')[2].length == 1) {
      persianDate = persianDate.substring(0, 8) + 0 + persianDate.substr(8);
    }

    return persianDate;
  }
  sortByDate = (data: any, toSort: any) => {
    return data.sort((a, b) => {
      return <any>new Date(a[toSort]) - <any>new Date(b[toSort]);
    });
  }
}
