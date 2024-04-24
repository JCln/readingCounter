import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { ListManagerService } from 'services/list-manager.service';
import { PageSignsService } from 'services/page-signs.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';


@Component({
  selector: 'app-per-day',
  templateUrl: './per-day.component.html',
  styleUrls: ['./per-day.component.scss']
})
export class PerDayComponent extends FactoryONE {
  _selectCols: any[] = [];
  _selectedColumns: any[];
  _selectMainDatas: any[];
  chartTemp: any[] = [];
  private readonly listManagerPerDayPositions: string = 'lMPerDayPositions';
  private readonly listManagerPerDay: string = 'lMPerDay';

  constructor(
    public closeTabService: CloseTabService,
    public listManagerService: ListManagerService,
    private dateJalaliService: DateJalaliService,
    private pageSignsService: PageSignsService
  ) {
    super();
  }

  routeToLMPDXY = (day: string) => {
    this.listManagerService.routeToLMPDXY(this.closeTabService.saveDataForLMPD, day);
  }
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  getObjectParameters = (sth: any): any[] => {
    let b = [];
    b.push(sth.overalCount);
    b.push(sth.readCount);
    b.push(sth.maneCount);
    return b;
  }
  doSth = () => {
    this.chartTemp = this.getObjectParameters(this.closeTabService.saveDataForLMPD);
  }
  private insertSelectedColumns = () => {
    this._selectMainDatas = this.listManagerService.columnManager.getColumnsMenus(this.listManagerPerDayPositions);
    this._selectCols = this.listManagerService.columnManager.getColumnsMenus(this.listManagerPerDay);
    this._selectedColumns = this.customizeSelectedColumns(this._selectCols);
    this.dateJalaliService.sortByDate(this.closeTabService.saveDataForLMPD.offLoadPerDayHistory, 'day');
  }
  private setGetRanges = () => {
    this.closeTabService.saveDataForLMPD.overalDuration = parseFloat(MathS.getRange(this.closeTabService.saveDataForLMPD.overalDuration));
    this.closeTabService.saveDataForLMPD.overalDistance = parseFloat(MathS.getRange(this.closeTabService.saveDataForLMPD.overalDistance));
  }
  private setDynamicPartRanges = () => {
    this.closeTabService.saveDataForLMPD.offLoadPerDayHistory.forEach(item => {
      if (item.duration > 0)
        item.duration = parseFloat(MathS.getRange(item.duration))
      if (item.distance > 0)
        item.distance = parseFloat(MathS.getRange(item.distance))
    })
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.pageSignsService.perday_pageSign.trackNumber) {
      this.listManagerService.routeToReading();
    }
    else {
      if (canRefresh) {
        this.closeTabService.saveDataForLMPD = null;
        this.closeTabService.saveDataForLMPDTrackNumber = null;
      }
      if (this.closeTabService.saveDataForLMPDTrackNumber != this.pageSignsService.perday_pageSign.trackNumber || !this.closeTabService.saveDataForLMPD) {
        this.closeTabService.saveDataForLMPD = await this.listManagerService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.ListOffloadedPERDAY, this.pageSignsService.perday_pageSign.trackNumber);
        this.closeTabService.saveDataForLMPDTrackNumber = this.pageSignsService.perday_pageSign.trackNumber;
        this.closeTabService.saveDataForLMPD.zoneTitle = this.pageSignsService.perday_pageSign.zone;
      }
      this.doSth();
      this.setGetRanges();
      this.setDynamicPartRanges();

      if (this.closeTabService.saveDataForLMPD)
        this.insertSelectedColumns();
    }
  }

}