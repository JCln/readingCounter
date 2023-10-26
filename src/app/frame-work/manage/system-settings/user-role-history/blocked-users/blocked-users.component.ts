import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.scss']
})
export class BlockedUsersComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.ipFilterBlockedUsers = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.securityService.blockedUsers_pageSign.GUid) {
      this.securityService.utilsService.backToPreviousPage();
    }
    else {
      if (canRefresh) {
        this.nullSavedSource();
      }
      this.closeTabService.ipFilterBlockedUsers = await this.securityService.ajaxReqWrapperService.postDataSourceByIdStringly(ENInterfaces.GetIpFilterBlockedByUserId, this.securityService.blockedUsers_pageSign.GUid);
      this.convertLoginTime();
    }
  }

  convertLoginTime = () => {
    this.closeTabService.ipFilterBlockedUsers.forEach(item => {
      item.insertDateTime = this.dateJalaliService.getDate(item.insertDateTime) + '   ' + this.dateJalaliService.getTime(item.insertDateTime);
    })
  }

}