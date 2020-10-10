import { Injectable } from '@angular/core';

import { privacies } from './DI/privacies';

@Injectable({
  providedIn: 'root'
})
export class PrivacyService {

  constructor() { }
  getPrivacyToggle = () => {
    return privacies;
  }
}
