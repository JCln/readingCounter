import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private router: Router) { }

  isEmptyString(value: string): boolean {
    return !value || 0 === value.length;
  }
  isNull(value: any): boolean {
    return typeof value === 'undefined' || !value || value.length === 0;
  }
  routeTo = (router: string) => {
    this.router.navigateByUrl(router);
  }

}
