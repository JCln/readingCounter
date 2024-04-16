import { Component, Input, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IObjectIteratation, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { IUserKarkardSummary } from 'interfaces/iuser-manager';
import { Table } from 'primeng/table';
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
  @ViewChild(Table) dtable: Table;
  hasFiltersInTable: boolean = false;
  provinceHierarchy: IProvinceHierarchy[] = [];

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
    this.provinceHierarchy = await this.trackingManagerService.dictionaryWrapperService.getProvinceHierarchy();
    this.zoneDictionary = await this.trackingManagerService.dictionaryWrapperService.getZoneDictionary();
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
    this.closeTabService.saveDataForUserKarkardSummaryReq.zoneIds = this.trackingManagerService.utilsService.getZoneHierarical(this.closeTabService.saveDataForUserKarkardSummaryReq.selectedZoneIds);
    const temp = this.trackingManagerService.verificationService.userKarkardValidation(this.closeTabService.saveDataForUserKarkardSummaryReq);
    if (temp)
      this.connectToServer();
  }

  getCounterStateHeaders = (data: any): any => {
    let c = [
      { field: 'regionTitle', header: 'منطقه', isSelected: true },
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
    this.closeTabService.saveDataForUserKarkardSummaryReq.selectedZoneIds = [];
    this.tempData = await this.trackingManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.postUserKarkardSummary, this.closeTabService.saveDataForUserKarkardSummaryReq);
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
  clearFilters(table: Table) {
    this.closeTabService.utilsService.clearFilters(table);
    this.hasFiltersInTable = false;
  }
  hasFilters = (dtable: Table) => {
    this.hasFiltersInTable = this.closeTabService.utilsService.hasFilters(dtable);
  }
  filteredTableEvent = (e: Table) => {
    this.hasFilters(e);
  }

}