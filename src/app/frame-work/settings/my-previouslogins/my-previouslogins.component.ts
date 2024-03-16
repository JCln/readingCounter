import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { SecurityService } from 'services/security.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-my-previouslogins',
  templateUrl: './my-previouslogins.component.html',
  styleUrls: ['./my-previouslogins.component.scss']
})
export class MyPreviousloginsComponent extends FactoryONE {
  logoutReasonDictionary: IDictionaryManager[] = [];
  invalidLoginReasonDictionary: IDictionaryManager[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  callAPI = async () => {
    this.closeTabService.myPreviousLogins = await this.securityService.ajaxReqWrapperService.getDataSource(ENInterfaces.requestLogMyPreviousLogins);
    this.logoutReasonDictionary = this.securityService.utilsService.getLogoutReason();
    this.invalidLoginReasonDictionary = this.securityService.utilsService.getInvalidLoginReason();
    this.convertLoginTime();

    Converter.convertIdToTitle(this.closeTabService.myPreviousLogins, this.logoutReasonDictionary, 'logoutReasonId');
    Converter.convertIdToTitle(this.closeTabService.myPreviousLogins, this.invalidLoginReasonDictionary, 'invalidLoginReasonId');
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForTrackReading)) {
      this.callAPI();
    }
  }
  convertLoginTime = () => {
    this.closeTabService.myPreviousLogins.forEach(item => {
      item.loginDateTime = this.dateJalaliService.getDate(item.loginDateTime) + '   ' + this.dateJalaliService.getTime(item.loginDateTime);
      item.logoutDateTime = this.dateJalaliService.getDate(item.logoutDateTime) + '   ' + this.dateJalaliService.getTime(item.logoutDateTime);
      item.twoStepEnterDateTime = this.dateJalaliService.getDate(item.twoStepEnterDateTime) + '   ' + this.dateJalaliService.getTime(item.twoStepEnterDateTime);
      item.twoStepExpireDateTime = this.dateJalaliService.getDate(item.twoStepExpireDateTime) + '   ' + this.dateJalaliService.getTime(item.twoStepExpireDateTime);
      item.twoStepType = MathS.isBoolean(item.twoStepWasSuccessful) ? EN_messages.twoStepTypeByTwo : EN_messages.twoStepTypeByUserPass;
    })
  }

}