import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IOutputManager } from 'interfaces/imanage';
import { IZoneManager } from 'interfaces/inon-manage';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { DateJalaliComponent } from 'src/app/core/_layouts/header/date-jalali/date-jalali.component';

@Component({
  selector: 'app-dbf-output',
  templateUrl: './dbf-output.component.html',
  styleUrls: ['./dbf-output.component.scss']
})
export class DbfOutputComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DateJalaliComponent) date;
  dbfOutput: IOutputManager;
  zoneDictionary: IZoneManager[] = [];

  subscription: Subscription[] = [];

  constructor(
    private outputManagerService: OutputManagerService,
    private trackingManagerService: TrackingManagerService,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) {
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

  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/dbf')
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}
