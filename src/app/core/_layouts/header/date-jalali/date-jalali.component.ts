import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DateJalaliService } from 'services/date-jalali.service';


@Component({
  selector: 'app-date-jalali',
  templateUrl: './date-jalali.component.html',
  styleUrls: ['./date-jalali.component.scss']
})
export class DateJalaliComponent implements OnChanges {
  datePickerConfig = {
    format: 'YYYY/MM/DD'
  }
  @Output() dateJalEvent = new EventEmitter<any>();
  @Input() dateObject: string;

  currentDate: string;
  originalDate: string;
  placeHolder: string = '';

  constructor(private dateJalaliService: DateJalaliService) {
    this.currentDate = this.dateJalaliService.getCurrentDate();

    // if (!this.dateObject) {
    //   this.placeHolder = this.currentDate;
    //   this.originalDate = this.currentDate;
    //   return;
    // }
    // this.originalDate = this.dateObject;
    // this.placeHolder = this.dateObject;
  }

  sendDateJal = ($event) => {
    this.dateJalEvent.emit($event.inputElementValue);
  }
  ngOnChanges(): void {
    setTimeout(() => {
      if (!this.dateObject) {
        this.dateObject = this.currentDate;
        return;
      }
      this.dateObject = this.dateObject;

    }, 0);

  }
}
