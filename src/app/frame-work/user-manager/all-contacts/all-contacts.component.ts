import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { IUserManager } from './../../../Interfaces/iuser-manager';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {
  columnDefs = [
    // { field: 'id', sortable: true, filter: true },
    { field: 'userCode', sortable: true, filter: true },
    { field: 'username', sortable: true, filter: true },
    { field: 'mobile', sortable: true, filter: true },
    { field: 'displayName', sortable: true, filter: true },
    { field: 'isActive', sortable: true, filter: true },
    { field: 'isLocked', sortable: true, filter: true }

  ];
  rowData: any;

  constructor(private httpClient: HttpClient) { }//private interfaceManagerService: InterfaceManagerService

  getDataSource = (): Promise<IUserManager> => {
    return new Promise((resolve) => {
      // this.interfaceManagerService.getAllUserContactsManager().subscribe(res => {
      this.httpClient.get('//37.191.92.130/kontoriNew/v1/user/all').subscribe((res: any) => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  classWrapper = async () => {
    const a = await this.getDataSource();
    console.log(a);
    this.rowData = a;
  }

  ngOnInit(): void {
    this.classWrapper();
  }

}
