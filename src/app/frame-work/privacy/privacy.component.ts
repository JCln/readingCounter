import { Component, OnInit } from '@angular/core';

import { IPrivacy } from './../../Interfaces/iprivacy';
import { PrivacyService } from './../../services/privacy.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  privacyOptions: IPrivacy;
  selectedCapacity: string = '';
  leastTextCapacity: string[] = ['4 نویسه', '6 نویسه', '8 نویسه', '10 نویسه'];

  _updatedSelectedToggles: string[] = [];
  isAllCompleted: boolean = false;

  constructor(private privacyService: PrivacyService) { }

  ngOnInit(): void {
    this.privacyOptions = this.privacyService.getPrivacyToggle();
  }

  updateAllComplete() {
    this.isAllCompleted = this.privacyOptions.task != null && this.privacyOptions.task.every(t => t.isChecked);
  }

  someComplete(): boolean {
    if (this.privacyOptions.task == null) {
      return false;
    }
    return this.privacyOptions.task.filter(t => t.isChecked).length > 0 && !this.isAllCompleted;
  }

  setAll(completed: boolean) {
    this.isAllCompleted = completed;
    if (this.privacyOptions.task == null) {
      return;
    }
    this.privacyOptions.task.forEach(t => t.isChecked = completed);
  }
}

