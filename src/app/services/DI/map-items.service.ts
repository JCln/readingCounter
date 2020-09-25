import { Injectable } from '@angular/core';

import { map } from './map';

@Injectable({
  providedIn: 'root'
})
export class MapItemsService {

  constructor() { }
  getMapItems = () => {
    return map;
  }
}
