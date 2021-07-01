import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { ITracking } from 'src/app/Interfaces/imanage';
import { ENTrackingMessage } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';

@Component({
  selector: 'app-offloaded',
  templateUrl: './offloaded.component.html',
  styleUrls: ['./offloaded.component.scss']
})
export class OffloadedComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: ITracking[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    public outputManagerService: OutputManagerService,
    private router: Router,
    public route: ActivatedRoute
  ) {
  }

  refreshTable = () => this.classWrapper(true);
  nullSavedSource = () => this.closeTabService.saveDataForTrackOffloaded = null;
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForTrackOffloaded) {
      this.dataSource = this.closeTabService.saveDataForTrackOffloaded;
    }
    else {
      this.dataSource = await this.trackingManagerService.getDataSource(ENInterfaces.trackingOFFLOADED);
      console.log(this.dataSource);

      this.closeTabService.saveDataForTrackOffloaded = this.dataSource;
    }

    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.trackingManagerService.columnSelectedMenuDefault();
    this._selectedColumns = this.trackingManagerService.customizeSelectedColumns(this._selectCols);
  }
  downloadOutputSingle = async (row: ITracking) => {
    const a = await this.trackingManagerService.downloadOutputSingle(row);
    this.outputManagerService.downloadFile(a);
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/track/offloaded')
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
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  routeToOffloadModify = (dataSource: ITracking) => {
    this.router.navigate(['wr/m/l/all', true, dataSource.id]);
  }
  backToReading = async (dataSource: ITracking, rowIndex: number) => {
    if (await this.trackingManagerService.TESTbackToConfirmDialog(dataSource.id, ENTrackingMessage.toReading))
      this.refetchTable(rowIndex);
  }
}