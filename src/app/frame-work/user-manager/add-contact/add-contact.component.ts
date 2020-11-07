import { Component, OnInit } from '@angular/core';

import { AddUserManagerService } from './../../../services/add-user-manager.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  dataSource: any;

  constructor(private addUserManagerService: AddUserManagerService) {
    this.dataSource = this.addUserManagerService.addUserManagerConfig();
  }

  addAContact = () => {
    this.addUserManagerService.addAContact(this.dataSource);
  }

  ngOnInit(): void {
    console.log(this.dataSource);

  }

}
