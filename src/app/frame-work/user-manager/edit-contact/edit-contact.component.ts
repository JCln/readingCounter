import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { EditContactManagerService } from './../../../services/edit-contact-manager.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  UUid: string = '';
  editContactData: any = [];

  constructor(
    private route: ActivatedRoute,
    private editContactManagerService: EditContactManagerService,
    private interfaceManagerService: InterfaceManagerService
  ) {
  }

  getContactSource = () => {
    this.interfaceManagerService.getUserContactManager(this.UUid).subscribe(res => {
      if (res) {
        this.editContactData = res.appItems;
        console.log(this.editContactData);
      }
    })
  }
  classWrapper = async () => {
    const a = await this.editContactManagerService.getContactSource(this.UUid);
    console.log(this.editContactData);
    this.editContactData = a.appItems;

  }
  ngOnInit(): void {
    this.UUid = this.route.snapshot.paramMap.get('id');
    // this.classWrapper();
    this.getContactSource();
  }

}
