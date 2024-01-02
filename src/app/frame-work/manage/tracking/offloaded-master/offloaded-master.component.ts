import { ColumnManager } from 'src/app/classes/column-manager';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ITracking, ITrackingMasterDto } from 'interfaces/itrackings';

@Component({
  selector: 'app-offloaded-master',
  templateUrl: './offloaded-master.component.html',
  styleUrls: ['./offloaded-master.component.scss']
})
export class OffloadedMasterComponent extends FactoryONE {
  private readonly offloadedMasterOutputName: string = 'offloadedMaster';
  _selectCols: any = [];
  _selectedColumns: any[];

  constructor(
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    private columnManager: ColumnManager,
    private cdk: ChangeDetectorRef
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    await this.closeTabService.getTrackingOffloadedMaster(canRefresh ? canRefresh : false);
    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.columnManager.getColumnsMenus(this.offloadedMasterOutputName);
    this._selectedColumns = this.trackingManagerService.columnManager.customizeSelectedColumns(this._selectCols);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  setColumnsChanges = (variableName: string, newValues: IObjectIteratation[]) => {
    // convert all items to false
    this[variableName].forEach(old => {
      old.isSelected = false;
    })

    // merge new values
    this[variableName].find(old => {
      newValues.find(newVals => {
        if (newVals.field == old.field)
          old.isSelected = true;
      })
    })
  }
  loadDetailPlease = async (dataSource: ITrackingMasterDto, rowIndex: number) => {
    console.log(dataSource);
    console.log(rowIndex);
    this.closeTabService.trackingOffloadedDetails[rowIndex] = await this.trackingManagerService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.trackingOffloadedDetails, dataSource.groupId);
    console.log(this.closeTabService.trackingOffloadedDetails);
    this.cdk.detectChanges();

    // this.closeTabService.trackingOffloadedDetails.push(res);
    // this.closeTabService.trackingOffloadedMaster.find(item => {
    //   if (dataSource.groupId == item.groupId) {
    //     this.closeTabService.trackingOffloadedDetails[rowIndex] = res;
    //   }
    // })
    // console.log(this.closeTabService.trackingOffloadedDetails);


  }
  routeToOffloadModify = (dataSource: ITracking) => {
    this.trackingManagerService.routeToOffloadModify(dataSource);
  }
  routeToOffloadLazy = (dataSource: ITracking) => {
    this.trackingManagerService.routeToOffloadLazy(dataSource);
  }


}