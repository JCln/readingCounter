import { Component, EventEmitter, Output } from '@angular/core';
import { DateJalaliService } from 'services/date-jalali.service';


@Component({
  selector: 'app-date-jalali',
  templateUrl: './date-jalali.component.html',
  styleUrls: ['./date-jalali.component.scss']
})
export class DateJalaliComponent {
  dateObject: any;
  datePickerConfig = {
    format: 'YYYY/MM/DD'
  }

  @Output() dateJalEvent = new EventEmitter<any>();

  constructor(private dateJalaliService: DateJalaliService) {
    this.dateObject = this.dateJalaliService.getCurrentDate();
    this.dateJalEvent.emit(this.dateObject);
  }

  sendDateJal = ($event) => {
    this.dateJalEvent.emit($event.inputElementValue);
  }
}
