import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { IFollowUp, IFollowUpHistory } from 'src/app/Interfaces/imanage';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit, AfterViewInit {
  @Input() dataSource: IFollowUp;
  changeHistory: IFollowUpHistory[] = [];

  _colsTimeLine: any[] = [];
  _selectCols: any[] = [];

  
  constructor() { }

  columnTimeLine = (): IObjectIteratation[] => {
    return [
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: false, readonly: true },
      { field: 'listNumber', header: 'ش لیست', isSelected: false, readonly: true },
      { field: 'insertDateJalali', header: 'تاریخ', isSelected: false, readonly: true },
      { field: 'zoneTitle', header: 'ناحیه', isSelected: false, readonly: true },
      { field: 'year', header: 'سال', isSelected: false, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, readonly: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, readonly: true },
      { field: 'fromDate', header: 'از', isSelected: false, readonly: true },
      { field: 'toDate', header: 'تا', isSelected: false, readonly: true },
      { field: 'itemQuantity', header: 'تعداد', isSelected: false, readonly: true },
      { field: 'alalHesabPercent', header: 'درصد علی الحساب', isSelected: true, readonly: false },
      { field: 'imagePercent', header: 'درصد تصویر', isSelected: true, readonly: false },
      { field: 'counterReaderName', header: 'مامور فعلی', isSelected: true, readonly: true },
      { field: 'newCounterReaderName', header: 'مامور جدید', isSelected: false, readonly: false },
      { field: 'displayBillId', header: 'شناسه قبض', isSelected: true, readonly: false },
      { field: 'displayRadif', header: 'ش.پرونده', isSelected: true, readonly: false },
      { field: 'isBazdid', header: 'بازدید', isSelected: false, readonly: true },
      { field: 'isRoosta', header: 'روستایی', isSelected: false, readonly: true }
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

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.changeHistory = this.dataSource.changeHistory;
    this.insertSelectedColumns();
  }

}
