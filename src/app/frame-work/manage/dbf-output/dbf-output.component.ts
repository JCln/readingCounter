import { Component, ViewChild } from '@angular/core';
import { IOutputManager } from 'interfaces/imanage';
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
  dbfOutput: IOutputManager;
  zoneDictionary: IZoneManager[] = [];

  constructor(
    private outputManagerService: OutputManagerService,
    private trackingManagerService: TrackingManagerService,
    private closeTabService: CloseTabService
  ) {
    super();
    this.dbfOutput = this.outputManagerService.getDBFOutPut;
  }

  connectToServer = async () => {
    if (!this.outputManagerService.checkVertification(this.dbfOutput))
      return;
    const res = await this.trackingManagerService.downloadOutputDBF(this.dbfOutput);
    this.outputManagerService.downloadFile(res, '.dbf');
  }
  nullSavedSource = () => this.closeTabService.saveDataForOutputDBF = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh)
      this.nullSavedSource();
    this.zoneDictionary = await this.trackingManagerService.getZoneDictionary();
  }
  receiveFromDateJalali = ($event: string) => {
    this.dbfOutput.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.dbfOutput.toDate = $event;
  }

}
