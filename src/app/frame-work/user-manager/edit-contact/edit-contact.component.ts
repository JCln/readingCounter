import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appItems, IUserEditManager } from 'src/app/Interfaces/iuser-manager';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { EditContactManagerService } from './../../../services/edit-contact-manager.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  UUid: string = '';
  editContactData: appItems[] = [];
  allUserData: IUserEditManager;

  constructor(
    private route: ActivatedRoute,
    private editContactManagerService: EditContactManagerService,
    private interfaceManagerService: InterfaceManagerService
  ) {
  }

  getContactSource = () => {
    this.interfaceManagerService.getUserContactManager(this.UUid).subscribe((res: IUserEditManager) => {
      if (res) {
        console.log(res);
        
        this.allUserData = res;
        this.editContactData = res.appItems;
      }
    })
  }
  editContactSource = async () => {
    const a = await this.editContactManagerService.editAUserContact(this.editContactData, this.allUserData);
    console.log(a);

    this.interfaceManagerService.postUserContactManager(a).subscribe(res => {
      if (res) {
        console.log(res);

      }
    })
  }
  ngOnInit(): void {
    this.UUid = this.route.snapshot.paramMap.get('id');
    this.getContactSource();
  }


}
