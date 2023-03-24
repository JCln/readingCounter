import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IObjectIteratation } from 'interfaces/ioverall-config';
import { IUserKarkardSummary } from 'interfaces/iuser-manager';
import { CloseTabService } from 'services/close-tab.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-user-karkard-summary',
  templateUrl: './user-karkard-summary.component.html',
  styleUrls: ['./user-karkard-summary.component.scss'],
  animations: [transitionAnimation]
})
export class UserKarkardSummaryComponent extends FactoryONE {
  tempData: IUserKarkardSummary[] = [];
  header: any[] = [];

  zoneDictionary: IDictionaryManager[] = [];

  _selectCols: any = [];
  _selectedColumns: any[];


  constructor(
    public trackingManagerService: TrackingManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForUserKarkardSummary = null;
      this.closeTabService.saveDataForUserKarkardSummaryTwo = null;
    }
    if (this.closeTabService.saveDataForUserKarkardSummary) {
      this._selectCols = this.closeTabService.saveDataForUserKarkardSummaryTwo;
      this._selectedColumns = this.trackingManagerService.columnManager.customizeSelectedColumns(this._selectCols);
    }

    this.zoneDictionary = await this.trackingManagerService.getZoneDictionary();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.getCounterStateHeaders(this.tempData);
    this._selectedColumns = this.trackingManagerService.columnManager.customizeSelectedColumns(this._selectCols);
    this.closeTabService.saveDataForUserKarkardSummaryTwo = this._selectCols;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  verification = async () => {
    const temp = this.trackingManagerService.userKarkardValidation(this.closeTabService.saveDataForUserKarkardSummaryReq);
    if (temp)
      this.connectToServer();
  }

  getCounterStateHeaders = (data: any): any => {
    let c = [
      { field: 'zoneTitle', header: 'ناحیه', isSelected: true },
      { field: 'userDisplayName', header: 'نام کاربر', isSelected: true },
      { field: 'overalCount', header: 'تعداد کل', isSelected: true, isNumber: true },
    ]
    for (let index = 0; index < data[0].trackingStages.length; index++) {
      c.push({ field: 'c' + index, header: data[0].trackingStages[index].title, isSelected: true });
    }
    return c;
  }
  getCounterStateData = (data: any) => {
    let auxData = [];

    for (let index = 0; index < data.length; index++) {
      let a =
      {
        zoneTitle: data[index].zoneTitle,
        userDisplayName: data[index].userDisplayName,
        overalCount: data[index].overalCount,
      };
      for (let j = 0; j < data[index].trackingStages.length; j++) {
        a['c' + j] = data[index].trackingStages[j].count
      }
      auxData.push(a);

    }
    return auxData;
  }
  connectToServer = async () => {

    this.tempData = await this.trackingManagerService.postBody(ENInterfaces.postUserKarkardSummary, this.closeTabService.saveDataForUserKarkardSummaryReq);
    this.insertSelectedColumns();
    this.closeTabService.saveDataForUserKarkardSummary = this.getCounterStateData(this.tempData);
  }
  receiveFromDateJalali = ($event: string) => {
    this.closeTabService.saveDataForUserKarkardSummaryReq.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.closeTabService.saveDataForUserKarkardSummaryReq.toDate = $event;
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

}