import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IUserLoggins } from 'interfaces/iuser-manager';
import { DateJalaliService } from 'services/date-jalali.service';
import { UserLogginsService } from 'services/user-loggins.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-user-loggins',
  templateUrl: './user-loggins.component.html',
  styleUrls: ['./user-loggins.component.scss']
})
export class UserLogginsComponent extends FactoryONE {
  dataSource: IUserLoggins[];

  constructor(
    public userLogginsService: UserLogginsService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (!this.userLogginsService.userLoggins_pageSign.GUid) {
      this.userLogginsService.utilsService.backToPreviousPage();
    }
    else {
      this.dataSource = await this.userLogginsService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.userLOGINS, this.userLogginsService.userLoggins_pageSign.GUid);
      this.convertLoginTime();
    }
  }

  convertLoginTime = () => {
    this.dataSource.forEach(item => {
      item.loginDateTime = this.dateJalaliService.getDate(item.loginDateTime) + '   ' + this.dateJalaliService.getTime(item.loginDateTime);
    })
  }

}