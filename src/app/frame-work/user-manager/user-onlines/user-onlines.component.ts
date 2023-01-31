import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';

import { UserOnlinesDgComponent } from './user-onlines-dg/user-onlines-dg.component';
import { UserOnlinesImgDgComponent } from './user-onlines-img-dg/user-onlines-img-dg.component';

@Component({
  selector: 'app-user-onlines',
  templateUrl: './user-onlines.component.html',
  styleUrls: ['./user-onlines.component.scss']
})
export class UserOnlinesComponent extends FactoryONE {
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    private userService: UsersAllService,
    private dateJalaliService: DateJalaliService,
    private dialogService: DialogService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForUserOnlines = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForUserOnlines) {
      this.closeTabService.saveDataForUserOnlines = await this.userService.connectToServer(ENInterfaces.userOnlines);
    }
    this.convertLoginTime();
  }
  convertLoginTime = () => {
    this.closeTabService.saveDataForUserOnlines.forEach(item => {
      item.connectDateTime = this.dateJalaliService.getDate(item.connectDateTime) + '   ' + this.dateJalaliService.getTime(item.connectDateTime);
    })
  }
  textMessageToAContact = (value: any) => {
    this.ref = this.dialogService.open(UserOnlinesDgComponent, {
      data: { _data: value },
      rtl: true,
      width: '80%',
    })
    this.ref.onClose.subscribe(async res => {
      if (res)
        console.log(res);

    });
  }
  imageToAContact = (value: any) => {
    this.ref = this.dialogService.open(UserOnlinesImgDgComponent, {
      data: { _data: value },
      rtl: true,
      width: '80%',
    })
    this.ref.onClose.subscribe(async res => {
      if (res)
        console.log(res);

    });
  }

}