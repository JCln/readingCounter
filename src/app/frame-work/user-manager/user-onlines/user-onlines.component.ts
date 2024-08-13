import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';

import { UserOnlinesDgComponent } from './user-onlines-dg/user-onlines-dg.component';
import { UserOnlinesImgDgComponent } from './user-onlines-img-dg/user-onlines-img-dg.component';
import { UserOnlinesVideoDgComponent } from './user-onlines-video-dg/user-onlines-video-dg.component';
import { MathS } from 'src/app/classes/math-s';
import { IUserOnlines } from 'interfaces/iuser-manager';

@Component({
  selector: 'app-user-onlines',
  templateUrl: './user-onlines.component.html',
  styleUrls: ['./user-onlines.component.scss']
})
export class UserOnlinesComponent extends FactoryONE {
  ref: DynamicDialogRef;
  shouldActive: boolean = false;

  constructor(
    public closeTabService: CloseTabService,
    private userService: UsersAllService,
    private dateJalaliService: DateJalaliService,
    private dialogService: DialogService
  ) {
    super();
  }

  convertLoginTime = () => {
    this.closeTabService.saveDataForUserOnlines.forEach(item => {
      item.connectDateTime = this.dateJalaliService.getDate(item.connectDateTime) + '   ' + this.dateJalaliService.getTime(item.connectDateTime);
    })
  }
  callAPI = async () => {
    this.closeTabService.saveDataForUserOnlines = await this.userService.ajaxReqWrapperService.getDataSource(ENInterfaces.userOnlines);
    this.convertLoginTime();
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForUserOnlines)) {
      this.callAPI();
    }
    this.getUserRole();
    this.convertLoginTime();
  }
  getUserRole = (): void => {
    this.shouldActive = this.closeTabService.utilsService.getIsAdminRole();
  }
  showExactConfig = (dataSource: IUserOnlines) => {
    dataSource.id = dataSource.userId;
    console.log(dataSource);
    this.closeTabService.utilsService.showUserConfigDialog(dataSource);
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
      contentStyle: { minWidth: '21rem' }
    })
    this.ref.onClose.subscribe(async res => {
      if (res)
        console.log(res);
    });
  }
  videoToAContact = (value: any) => {
    this.ref = this.dialogService.open(UserOnlinesVideoDgComponent, {
      data: { _data: value },
      rtl: true,
      contentStyle: { minWidth: '21rem' }
    })
    this.ref.onClose.subscribe(async res => {
      if (res)
        console.log(res);
    });
  }

}