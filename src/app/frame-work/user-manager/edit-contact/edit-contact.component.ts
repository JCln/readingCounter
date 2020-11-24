import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { appItems } from 'src/app/Interfaces/iuser-manager';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { IRoleItems, IUserInfo } from './../../../Interfaces/iuser-manager';
import { EditContactManagerService } from './../../../services/edit-contact-manager.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit, AfterViewInit {
  UUid: string = '';
  personalizeInfo: IUserInfo;
  provinceItemsData: any;
  dataSource: any;

  // stepper
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  // 

  addContactData: appItems[] = [];
  // add role config
  roleItemsData: IRoleItems[] = [];
  // 

  constructor(
    private editUserManagerService: EditContactManagerService,
    private interfaceManagerService: InterfaceManagerService,
    private route: ActivatedRoute,
    private interactionService: InteractionService,
    private router: Router
  ) {
  }
  addAContact = () => {
    this.editUserManagerService.editAUserContact(this.dataSource, this.UUid);
  }
  getContactSource = () => {
    this.interfaceManagerService.getUserContactManager(this.UUid).subscribe((res: any) => {
      if (res) {
        this.dataSource = res;
        this.roleItemsData = res.roleItems;
        this.addContactData = res.appItems;
        this.provinceItemsData = res.provinceItems;
        this.personalizeInfo = res.userInfo;
        console.log(this.personalizeInfo);

      }
    })
  }

  ngOnInit(): void {
    this.UUid = this.route.snapshot.paramMap.get('id');
    this.getContactSource();
  }
  ngAfterViewInit(): void {
    this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url)
          this.ngOnInit();
      }
    })
  }

}
