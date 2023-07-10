import { Injectable } from '@angular/core';

export interface IPerdayNessessities {
  trackNumber: number,
  zone: string,

}

@Injectable({
  providedIn: 'root'
})
export class PageSignsService {

  perday_pageSign: IPerdayNessessities = {
    trackNumber: null,
    zone: null,
  };

}
