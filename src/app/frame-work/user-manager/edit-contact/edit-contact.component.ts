import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { appItems } from 'src/app/Interfaces/iuser-manager';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { IRoleItems, IUserInfo } from './../../../Interfaces/iuser-manager';
import { EditContactManagerService } from './../../../services/edit-contact-manager.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit, AfterViewInit, OnDestroy {
  UUid: string = '';
  personalizeInfo: IUserInfo;
  provinceItemsData: any;
  dataSource: any;
  subscription: Subscription[] = [];

  addContactData: appItems[] = [];
  // add role config
  roleItemsData: IRoleItems[] = [];
  // 

  constructor(
    private editUserManagerService: EditContactManagerService,
    private interfaceManagerService: InterfaceManagerService,
    private route: ActivatedRoute,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) {
  }
  addRoleItems = () => {
    this.editUserManagerService.addAUserRoles(this.roleItemsData);
  }
  addAContact = () => {
    this.editUserManagerService.editAUserContact(this.UUid);
  }
  nullSavedSource = () => this.closeTabService.saveDataForEditContacts = null;
  getContactSource = () => {
    this.interfaceManagerService.getUserContactManager(this.UUid).subscribe((res: any) => {
      if (res) {
        this.dataSource = res;
        this.closeTabService.saveDataForEditContacts = res;
        this.roleItemsData = this.dataSource.roleItems;
        this.addContactData = this.dataSource.appItems;
        this.provinceItemsData = this.dataSource.provinceItems;
        this.personalizeInfo = this.dataSource.userInfo;        
      }
    })
  }
  ngOnInit(): void {
    this.UUid = this.route.snapshot.paramMap.get('id');
    this.getContactSource();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res.includes('/wr/mu/edit/'))
          this.getContactSource();
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
