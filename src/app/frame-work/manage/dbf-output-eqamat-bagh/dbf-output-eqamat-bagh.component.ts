import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { DateJalaliComponent } from 'src/app/core/_layouts/header/date-jalali/date-jalali.component';

@Component({
  selector: 'app-dbf-output-eqamat-bagh',
  templateUrl: './dbf-output-eqamat-bagh.component.html',
  styleUrls: ['./dbf-output-eqamat-bagh.component.scss']
})
export class DbfOutputEqamatBaghComponent extends FactoryONE {
  @ViewChild(DateJalaliComponent) date;
  zoneDictionary: IDictionaryManager[] = [];
  constructor(
    public trackingManagerService: TrackingManagerService,
    private outputManagerService: OutputManagerService,
    private closeTabService: CloseTabService
  ) {
    super();
  }

  connectToServer = async () => {
    if (this.trackingManagerService.checkVertificationDBFEqamatBagh(this.trackingManagerService.dbfOutputEqamatBagh)) {
      console.log(this.trackingManagerService.dbfOutputEqamatBagh);

      const res = await this.trackingManagerService.downloadOutputDBFEqamatBagh(ENInterfaces.OutputDBFEqamatBagh, this.trackingManagerService.dbfOutputEqamatBagh);
      this.outputManagerService.downloadFileWithContentDisposition(res);
    }
  }
  nullSavedSource = () => this.closeTabService.saveDataForOutputDBFEqamatBagh = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh)
      this.nullSavedSource();
    this.zoneDictionary = await this.trackingManagerService.dictionaryWrapperService.getZoneDictionary();
  }

}
