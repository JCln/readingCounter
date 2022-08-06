import { Component, ViewChild } from '@angular/core';
import { IZoneManager } from 'interfaces/izones';
import { CloseTabService } from 'services/close-tab.service';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { DateJalaliComponent } from 'src/app/core/_layouts/header/date-jalali/date-jalali.component';

@Component({
  selector: 'app-dbf-output',
  templateUrl: './dbf-output.component.html',
  styleUrls: ['./dbf-output.component.scss']
})
export class DbfOutputComponent extends FactoryONE {
  @ViewChild(DateJalaliComponent) date;
  zoneDictionary: IZoneManager[] = [];

  constructor(
    public trackingManagerService: TrackingManagerService,
    private outputManagerService: OutputManagerService,
    private closeTabService: CloseTabService
  ) {
    super();
  }

  connectToServer = async () => {
    if (this.trackingManagerService.checkVertificationDBF(this.trackingManagerService.dbfOutput)) {
      const res = await this.trackingManagerService.downloadOutputDBF(this.trackingManagerService.dbfOutput);
      this.outputManagerService.downloadFile(res, '.dbf');
    }
  }
  nullSavedSource = () => this.closeTabService.saveDataForOutputDBF = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh)
      this.nullSavedSource();
    this.zoneDictionary = await this.trackingManagerService.getZoneDictionary();
  }
  receiveFromDateJalali = ($event: string) => {
    this.trackingManagerService.dbfOutput.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.trackingManagerService.dbfOutput.toDate = $event;
  }

}
