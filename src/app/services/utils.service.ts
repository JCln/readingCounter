import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  isEmptyString(value: string): boolean {
    return !value || 0 === value.length;
  }
  isNull(value: any): boolean {
    return typeof value === 'undefined' || !value || value.length === 0;
  }

}
