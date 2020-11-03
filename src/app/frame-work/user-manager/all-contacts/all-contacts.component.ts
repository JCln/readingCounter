import { Component, OnInit } from '@angular/core';

import { IUserManager } from './../../../Interfaces/iuser-manager';
import { InterfaceManagerService } from './../../../services/interface-manager.service';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {
  columnDefs = [
    { field: 'id', sortable: true, filter: true },
    { field: 'userCode', sortable: true, filter: true },
    { field: 'username', sortable: true, filter: true },
    { field: 'mobile', sortable: true, filter: true },
    { field: 'displayName', sortable: true, filter: true },
    { field: 'isActive', sortable: true, filter: true },
    { field: 'isLocked', sortable: true, filter: true }

  ];
  rowData: IUserManager[];

  constructor(private interfaceManagerService: InterfaceManagerService) { }

  getDataSource = (): Promise<IUserManager> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAllUserContactsManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  classWrapper = async () => {
    const a = await this.getDataSource();
    console.log(a);
    this.rowData.push(a);
  }

  ngOnInit(): void {
    this.classWrapper();
  }

}
