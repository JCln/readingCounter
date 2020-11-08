import { Component, OnInit } from '@angular/core';

import { IAddAUserManager } from './../../../Interfaces/iuser-manager';
import { AddUserManagerService } from './../../../services/add-user-manager.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  personalizeInfo: IAddAUserManager;
  provinceItemsData: any;
  dataSource: any;

  constructor(private addUserManagerService: AddUserManagerService) {
    this.dataSource = this.addUserManagerService.addUserManagerConfig();
    console.log(this.dataSource);

    this.getProvinceItems();
  }
  getProvinceItems = () => {
    this.provinceItemsData = this.dataSource.provinceItems;
    this.provinceItemsData.map(regionIt => {
      regionIt.regionItems.map(zoneIt => {
        zoneIt.zoneItems.map(val => {
          console.log(val.id);
          
        })
      })
    })
  }
  addAContact = () => {
    this.addUserManagerService.addAContact(this.dataSource);
  }

  ngOnInit(): void {
    console.log(this.dataSource);

  }

}
