import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-user-onlines',
  templateUrl: './user-onlines.component.html',
  styleUrls: ['./user-onlines.component.scss']
})
export class UserOnlinesComponent extends FactoryONE {
  constructor(
    public closeTabService: CloseTabService,
    private userService: UsersAllService,
    private dateJalaliService: DateJalaliService
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
}