import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
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
export class EditContactComponent implements OnInit, AfterViewInit, OnDestroy {
  UUid: string = '';
  personalizeInfo: IUserInfo;
  provinceItemsData: any;
  dataSource: any;
  subscription: Subscription[] = [];

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
  nullSavedSource = () => this.interactionService.saveDataForEditContacts = null;
  getContactSource = (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.interactionService.saveDataForEditContacts) {
      this.dataSource = this.interactionService.saveDataForEditContacts;
      this.roleItemsData = this.dataSource.roleItems;
      this.addContactData = this.dataSource.appItems;
      this.provinceItemsData = this.dataSource.provinceItems;
      this.personalizeInfo = this.dataSource.userInfo;
    }
    else {
      this.interfaceManagerService.getUserContactManager(this.UUid).subscribe((res: any) => {
        if (res) {
          this.dataSource = res;
          this.interactionService.saveDataForEditContacts = res;

          this.roleItemsData = this.dataSource.roleItems;
          this.addContactData = this.dataSource.appItems;
          this.provinceItemsData = this.dataSource.provinceItems;
          this.personalizeInfo = this.dataSource.userInfo;
        }
      })
    }
  }
  ngOnInit(): void {
    this.UUid = this.route.snapshot.paramMap.get('id');
    this.getContactSource();
  }
  closeTabStatus = () => {
    this.subscription.push(this.interactionService.getClosedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url) {
          this.nullSavedSource();
        }
      }
    })
    )
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url)
          this.getContactSource(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.closeTabStatus();
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
