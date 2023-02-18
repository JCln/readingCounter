import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IObjectIteratation, ITitleValue } from 'interfaces/ioverall-config';
import { IKarkardAllStatesDto } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-karkard-all-states',
  templateUrl: './karkard-all-states.component.html',
  styleUrls: ['./karkard-all-states.component.scss']
})
export class KarkardAllStatesComponent extends FactoryONE {
  tempData: IKarkardAllStatesDto[] = [];
  header: any[] = [];

  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  fragmentByZoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  _selectCols: any = [];
  _selectedColumns: any[];


  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService,
    private columnManager: ColumnManager
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForKarkardAllStates = null;
    }
    if (this.closeTabService.saveDataForKarkardAllStates) {
      this._selectCols = this.closeTabService.saveDataForKarkardAllStatesTWO;
      this._selectedColumns = this.columnManager.customizeSelectedColumns(this._selectCols);
    }

    this.readingReportManagerService.getSearchInOrderTo();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.getFragmentByZone();

    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.receiveYear();
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
    if (this.readingReportManagerService.offKarkardAllStatesReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.getFragmentMasterByZoneDictionary(this.readingReportManagerService.offKarkardAllStatesReq.zoneId);
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.offKarkardAllStatesReq, this.readingReportManagerService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }

  getCounterStateHeaders = (data: any): any => {
    let c = [
      { field: 'offloadDayalali', header: 'روز', isSelected: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: false },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: false },
      { field: 'counterReaderName', header: 'مامور', isSelected: true },
      { field: 'duration', header: 'زمان', isSelected: false, isNumber: true },
      { field: 'overalCount', header: 'تعداد کل', isSelected: true, isNumber: true },
      { field: 'zoneTitle', header: 'ناحیه', isSelected: false },
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: false, isNumber: true }
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
        zoneTitle: data[index].zoneTitle
      };
      for (let j = 0; j < data[index].counterStateAndCounts.length; j++) {
        a['c' + j] = data[index].counterStateAndCounts[j].count
      }
      auxData.push(a);

    }
    return auxData;
  }
  connectToServer = async () => {

    this.tempData = await this.readingReportManagerService.portRRTest(ENInterfaces.postKarkardAllStates, this.readingReportManagerService.offKarkardAllStatesReq);
    this.insertSelectedColumns();
    this.closeTabService.saveDataForKarkardAllStates = this.getCounterStateData(this.tempData);
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