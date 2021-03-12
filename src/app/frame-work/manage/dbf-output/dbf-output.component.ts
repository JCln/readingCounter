import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { DateJalaliComponent } from 'src/app/core/_layouts/header/date-jalali/date-jalali.component';
import { IOutputManager, IZoneManager } from 'src/app/Interfaces/imanage';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';

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

  connectToServer = () => {
    if (!this.outputManagerService.checkVertification(this.dbfOutput))
      return;
    this.trackingManagerService.downloadOutputDBF(this.dbfOutput).subscribe((res: Blob) => {
      this.outputManagerService.downloadFile(res, '.dbf');
    })
  }
  getZoneDictionary = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.trackingManagerService.getAllZoneTitles().subscribe(res => {
          resolve(res);
        })
      });
    } catch {
      console.error(e => e);
    }
  }
  nullSavedSource = () => this.closeTabService.saveDataForOutputDBF = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh)
      this.nullSavedSource();
    this.zoneDictionary = await this.getZoneDictionary();
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
