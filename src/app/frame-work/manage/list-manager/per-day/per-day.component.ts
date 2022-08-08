import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IListManagerPDHistory, IOffLoadPerDay } from 'interfaces/itrackings';
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
  dataSource: IOffLoadPerDay;
  offLoadPerDayHistory: IListManagerPDHistory[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];
  _selectMainDatas: any[];

  constructor(
    private closeTabService: CloseTabService,
    public listManagerService: ListManagerService,
    private dateJalaliService: DateJalaliService,
    private PageSignsService: PageSignsService
  ) {
    super();
  }

  routeToLMPDXY = (day: string) => {
    this.listManagerService.routeToLMPDXY(this.dataSource, day);
  }
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  private insertSelectedColumns = () => {
    this._selectMainDatas = this.listManagerService.getLMPerDayPositions();
    this._selectCols = this.listManagerService.getLMPerDay();
    this._selectedColumns = this.customizeSelectedColumns(this._selectCols);
    this.dateJalaliService.sortByDate(this.offLoadPerDayHistory, 'day');
  }
  private setGetRanges = () => {
    this.dataSource.overalDuration = parseFloat(MathS.getRange(this.dataSource.overalDuration));
    this.dataSource.overalDistance = parseFloat(MathS.getRange(this.dataSource.overalDistance));
  }
  private setDynamicPartRanges = () => {
    this.offLoadPerDayHistory.forEach(item => {
      if (item.duration > 0)
        item.duration = parseFloat(MathS.getRange(item.duration))
      if (item.distance > 0)
        item.distance = parseFloat(MathS.getRange(item.distance))
    })
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.PageSignsService.perday_pageSign.trackNumber) {
      this.listManagerService.routeToReading();
    }
    else {
      if (canRefresh) {
        this.closeTabService.saveDataForLMPD = null;
        this.closeTabService.saveDataForLMPDTrackNumber = null;
      }
      if (this.closeTabService.saveDataForLMPDTrackNumber === this.PageSignsService.perday_pageSign.trackNumber && this.closeTabService.saveDataForLMPD) {
        this.dataSource = this.closeTabService.saveDataForLMPD;
      }
      else {
        this.dataSource = await this.listManagerService.getLM(ENInterfaces.ListOffloadedPERDAY, this.PageSignsService.perday_pageSign.trackNumber);

        this.closeTabService.saveDataForLMPD = this.dataSource;
        this.closeTabService.saveDataForLMPDTrackNumber = this.PageSignsService.perday_pageSign.trackNumber;
      }
      this.offLoadPerDayHistory = this.dataSource.offLoadPerDayHistory;

      this.setGetRanges();
      this.setDynamicPartRanges();

      if (this.dataSource)
        this.insertSelectedColumns();
    }
  }

}