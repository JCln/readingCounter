import { Injectable } from '@angular/core';

import { IPrivacy } from '../Interfaces/inon-manage';
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
