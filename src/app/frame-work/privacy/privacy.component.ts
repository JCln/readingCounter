import { Component, OnInit } from '@angular/core';

import { IPrivacy } from './../../Interfaces/iprivacy';
import { PrivacyService } from './../../services/privacy.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  privacyToggle: IPrivacy[] = [];
  selectedCapacity: string = '';
  leastTextCapacity: string[] = ['4 نویسه', '6 نویسه', '8 نویسه', '10 نویسه'];

  _updatedSelectedToggles: string[] = [];
  constructor(private privacyService: PrivacyService) { }

  toggledItem = () => {

  }

  ngOnInit(): void {
    this.privacyToggle = this.privacyService.getPrivacyToggle();
    this.updateText();

  }
  updateText = () => {
    if (this._updatedSelectedToggles != null)
      this._updatedSelectedToggles = [];
      
    this.privacyToggle.map(selectedItems => {
      if (selectedItems.selected) {
        this._updatedSelectedToggles.push(selectedItems.leftToggle)
      }
      if (!selectedItems.selected) {
        this._updatedSelectedToggles.push(selectedItems.rightToggle)
      }
    })

    console.log(this._updatedSelectedToggles);

  }

}
