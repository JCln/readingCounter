import { DateJalaliService } from 'services/date-jalali.service';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ITextBackupLog } from 'interfaces/iserver-manager';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-errors-backup',
  templateUrl: './errors-backup.component.html',
  styleUrls: ['./errors-backup.component.scss']
})
export class ErrorsBackupComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
    public dateJalaliService: DateJalaliService
  ) {
    super();
  }

  convertLoginTime = () => {
    this.closeTabService.errorsBackup.forEach(item => {
      item.occuranceDateTime = this.dateJalaliService.getDate(item.occuranceDateTime) + '   ' + this.dateJalaliService.getTime(item.occuranceDateTime);
    })
  }
  callAPI = async () => {
    this.closeTabService.errorsBackup = await this.securityService.ajaxReqWrapperService.getDataSource(ENInterfaces.requestLogErrorsBackup);
    this.convertLoginTime();
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.errorsBackup))
      this.callAPI();
  }
  showStackTraceDialog = (event: ITextBackupLog) => {
    console.log(event);
    const config = {
      messageTitle: '',
      text: 'StackTrace: ' + event.stacktrace,
      width: '100%',
      isInput: false,
      isDelete: false,
      isImportant: false,
      icon: 'pi pi-server'
    }
    this.closeTabService.utilsService.primeConfirmDialog(config);
  }
  showMessageDialog = (event: ITextBackupLog) => {
    console.log(event);
    const config = {
      messageTitle: '',
      text: 'Message: ' + event.message,
      width: '100%',
      isInput: false,
      isDelete: false,
      isImportant: false,
      icon: 'pi pi-envelope'
    }
    this.closeTabService.utilsService.primeConfirmDialog(config);
  }

}