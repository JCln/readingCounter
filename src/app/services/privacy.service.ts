import { Injectable } from '@angular/core';

import { IPrivacy } from '../Interfaces/iprivacy';
import { privacies } from './DI/privacies';

@Injectable({
  providedIn: 'root'
})
export class PrivacyService {

  constructor() { }
  getPrivacyToggle = (): IPrivacy => {
    return privacies;
  }
}
