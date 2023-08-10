import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    private importDynamicService: ImportDynamicService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForImportErrors = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForImportErrors) {
      this.closeTabService.saveDataForImportErrors = await this.importDynamicService.ajaxReqWrapperService.getDataSource(ENInterfaces.getImportErrros);
      this.convertLoginTime();
    }

  }
  convertLoginTime = () => {
    this.closeTabService.saveDataForImportErrors.forEach(item => {
      item.importDateTime = this.dateJalaliService.getDate(item.importDateTime) + '   ' + this.dateJalaliService.getTime(item.importDateTime);
    })
  }

}
