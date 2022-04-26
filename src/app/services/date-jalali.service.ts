import { Injectable } from '@angular/core';
import { Converter } from 'src/app/classes/converter';

@Injectable({
  providedIn: 'root'
})
export class DateJalaliService {
  constructor() { }

  getCurrentTime = () => {
    let persianTime = new Date().toLocaleTimeString('fa-IR', {
      hour12: false,
      hour: "numeric",
      minute: "numeric"
    });

    return Converter.persianToEngNumbers(persianTime);
  }
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
    return Converter.persianToEngNumbers(persianDate);
  }
  getTime = (item: any) => {
    let persianTime = new Date(item).toLocaleTimeString('fa-IR');
    if (persianTime.length == 7)
      return Converter.persianToEngNumbers(persianTime = 0 + persianTime);
    return Converter.persianToEngNumbers(persianTime);
  }
  getDate = (item: any) => {
    let persianDate = new Date(item).toLocaleDateString('fa-IR');

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
    return Converter.persianToEngNumbers(persianDate);
  }
  sortByDate = (data: any, toSort: any) => {
    return data.sort((a, b) => {
      return <any>new Date(a[toSort]) - <any>new Date(b[toSort]);
    });
  }
  sortByDatePersian = (a: any, b: any) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  }
  sortByDateDESCPersian = (a: any, b: any) => {
    if (a.time > b.time) {
      return -1;
    }
    if (a.time < b.time) {
      return 1;
    }
    return 0;
  }

  sortByEshterak = (a: any, b: any) => {
    if (a.eshterak < b.eshterak) {
      return -1;
    }
    if (a.eshterak > b.eshterak) {
      return 1;
    }
    return 0;
  }
  sortByEshterakDESC = (a: any, b: any) => {
    if (a.eshterak > b.eshterak) {
      return -1;
    }
    if (a.eshterak < b.eshterak) {
      return 1;
    }
    return 0;
  }

}
