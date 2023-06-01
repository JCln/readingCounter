import { AfterViewInit, Component, Input } from '@angular/core';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { IFollowUp, IFollowUpHistory } from 'interfaces/isearchs';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements AfterViewInit {
  @Input() dataSource: IFollowUp;
  changeHistory: IFollowUpHistory[] = [];

  _colsTimeLine: any[] = [];
  _selectCols: any[] = [];
  sortedItems: any;

  constructor() { }

  columnTimeLine = (): IObjectIteratation[] => {
    return [
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: false, readonly: true },
      { field: 'listNumber', header: 'ش لیست', isSelected: false, readonly: true, icon: 'grid-column: auto/ span 2;' },
      { field: 'insertDateJalali', header: 'تاریخ', isSelected: false, readonly: true },
      { field: 'zoneTitle', header: 'ناحیه', isSelected: false, readonly: true },
      { field: 'year', header: 'سال', isSelected: false, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, readonly: true, ltr: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, readonly: true, ltr: true },
      { field: 'fromDate', header: 'از', isSelected: false, readonly: true },
      { field: 'toDate', header: 'تا', isSelected: false, readonly: true },
      { field: 'itemQuantity', header: 'تعداد', isSelected: false, readonly: true },
      { field: 'alalHesabPercent', header: 'درصد علی‌الحساب', isSelected: true, readonly: false, isNumber: true },
      { field: 'imagePercent', header: 'درصد تصویر', isSelected: true, readonly: false, isNumber: true },
      { field: 'counterReaderName', header: 'قرائت کننده فعلی', isSelected: true, readonly: true },
      { field: 'newCounterReaderName', header: 'قرائت کننده جدید', isSelected: false, readonly: false },
      { field: 'displayBillId', header: 'نمایش شناسه قبض', isSelected: true, readonly: false, isBoolean: true },
      { field: 'displayRadif', header: 'نمایش ش.پرونده', isSelected: true, readonly: false, isBoolean: true },
      { field: 'isBazdid', header: 'بازدید', isSelected: false, readonly: true, isBoolean: true },
      { field: 'isRoosta', header: 'روستایی', isSelected: false, readonly: true, isBoolean: true }
    ];
  }
  customizeSelectedColumns = () => {
    return this._colsTimeLine.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  private insertSelectedColumns = () => {
    this._colsTimeLine = this.columnTimeLine();
    this._selectCols = this.customizeSelectedColumns();
  }

  ngAfterViewInit(): void {
    this.changeHistory = this.dataSource.changeHistory;

    if (this.dataSource) {

      this.insertSelectedColumns();
      // this.sortData();
    }
  }
  // sortData() {
  //   this.sortedItems = this.changeHistory.sort((a: any, b: any) =>
  //     new Date(a.date).getTime() - new Date(b.date).getTime()
  //   );
  // }
  // dateNow: Date = new Date();

}
