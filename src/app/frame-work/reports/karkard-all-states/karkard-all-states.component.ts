import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IObjectIteratation, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { IKarkardAllStatesDto } from 'interfaces/ireports';
import { Table } from 'primeng/table';
import { TreeSelect } from 'primeng/treeselect';
import { CloseTabService } from 'services/close-tab.service';
import { OutputManagerService } from 'services/output-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-karkard-all-states',
  templateUrl: './karkard-all-states.component.html',
  styleUrls: ['./karkard-all-states.component.scss'],
  animations: [transitionAnimation]
})
export class KarkardAllStatesComponent extends FactoryONE {
  @ViewChild(Table) dtable: Table;
  tempData: IKarkardAllStatesDto[] = [];
  header: any[] = [];
  hasFiltersInTable: boolean = false;
  provinceHierarchy: IProvinceHierarchy[] = [];
  public readonly routerLink: string = this.closeTabService.utilsService.compositeService.getRouterUrl();
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;
  selectedZoneIds = [];

  fragmentByZoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  _selectCols: any = [];
  _selectedColumns: any[];


  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService,
    public outputManagerService: OutputManagerService,
    private columnManager: ColumnManager
  ) {
    super();
  }

  classWrapper = async () => {
    if (!MathS.isNull(this.closeTabService.saveDataForKarkardAllStates)) {
      this._selectCols = this.closeTabService.saveDataForKarkardAllStatesTWO;
      this._selectedColumns = this.columnManager.customizeSelectedColumns(this._selectCols);
    }

    this.closeTabService.getSearchInOrderTo();
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
    this.getFragmentByZone();

    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.getCounterStateHeaders(this.tempData);

    this._selectedColumns = this.columnManager.customizeSelectedColumns(this._selectCols);
    this.closeTabService.saveDataForKarkardAllStatesTWO = this._selectCols;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  getFragmentByZone = async () => {
    if (this.myTreeSelect.value)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.getFragmentMastersInZones(this.myTreeSelect.value);
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.offKarkardAllStatesReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    if (this.closeTabService.offKarkardAllStatesReq._selectedKindId)
      this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.offKarkardAllStatesReq._selectedKindId);
  }
  verification = async () => {
    this.closeTabService.offKarkardAllStatesReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.offKarkardAllStatesReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }

  getCounterStateHeaders = (data: any): any => {
    // should add to getCounterStateData method too.
    let c = [
      { field: 'regionTitle', header: 'منطقه', isSelected: true, isSelectedOrigin: true },
      { field: 'zoneTitle', header: 'ناحیه', isSelected: true },
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: false, isNumber: true },
      { field: 'offloadDayalali', header: 'روز', isSelected: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: false },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: false },
      { field: 'counterReaderName', header: 'قرائت کننده', isSelected: true },
      { field: 'duration', header: 'مدت', isSelected: false, isNumber: true },
      { field: 'overalCount', header: 'تعداد کل', isSelected: true, isNumber: true },
    ]
    for (let index = 0; index < data[0].counterStateAndCounts.length; index++) {
      c.push({ field: 'c' + index, header: data[0].counterStateAndCounts[index].counterStateTitle, isSelected: true });
    }
    return c;
  }
  getCounterStateData = (data: any) => {
    let auxData = [];

    for (let index = 0; index < data.length; index++) {
      let a =
      {
        counterReaderName: data[index].counterReaderName,
        duration: data[index].duration,
        fromEshterak: data[index].fromEshterak,
        toEshterak: data[index].toEshterak,
        offloadDayalali: data[index].offloadDayalali,
        overalCount: data[index].overalCount,
        trackNumber: data[index].trackNumber,
        zoneTitle: data[index].zoneTitle,
        regionTitle: data[index].regionTitle
      };
      for (let j = 0; j < data[index].counterStateAndCounts.length; j++) {
        a['c' + j] = data[index].counterStateAndCounts[j].count
      }
      auxData.push(a);

    }
    return auxData;
  }
  connectToServer = async () => {
    this.tempData = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.postKarkardAllStates, this.closeTabService.offKarkardAllStatesReq);
    this.insertSelectedColumns();
    this.closeTabService.saveDataForKarkardAllStates = this.getCounterStateData(this.tempData);
    console.log(this.closeTabService.saveDataForKarkardAllStates);

  }
  getPerfectDataSource = (dataSource: any): any => {
    if (!!dataSource.filteredValue) { // there is sth to filter && dataSource is exsiting
      return dataSource.filteredValue;
    }
    else {
      return dataSource._value;
    }
  }
  calcSums(dataSource: any, param: string): number {
    let average = this.getPerfectDataSource(dataSource);
    if (average) {
      let total: number = 0;
      for (let index = 0; index < average.length; index++) {
        total += average[index][param] ? average[index][param] : 0;
      }
      return total;
    }
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