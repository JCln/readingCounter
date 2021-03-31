import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { IProfile } from 'src/app/Interfaces/iuser-manager';
import { InteractionService } from 'src/app/services/interaction.service';
import { ProfileService } from 'src/app/services/profile.service';

import { IChangePassword } from './../../Interfaces/inon-manage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];
  password: IChangePassword = { oldPassword: '', newPassword: '', confirmPassword: '' };
  myInfoDataSource: IProfile;
  _selectCols: IObjectIteratation[];

  constructor(
    private interactionService: InteractionService,
    private profileService: ProfileService
  ) { }

  classWrapper = async () => {
    this.myInfoDataSource = await this.profileService.getMyInfoDataSource();
    this.getSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/profile')
          this.ngOnInit();
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
  toDefaultPassword = () => {
    this.password.confirmPassword = '';
    this.password.newPassword = '';
    this.password.oldPassword = '';
  }
  changePassword = () => {
    this.profileService.changePassword(this.password);
    this.toDefaultPassword();
  }
  getSelectedColumns = () => {
    this._selectCols = this.profileService.columnSelectedProfile();
  }

}
