import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateJalaliService } from 'src/app/services/date-jalali.service';


@Component({
  selector: 'app-date-jalali',
  templateUrl: './date-jalali.component.html',
  styleUrls: ['./date-jalali.component.scss']
})
export class DateJalaliComponent implements OnInit {
  dateObject: any;
  datePickerConfig = {
    format: 'YYYY/M/D'
  }

  @Output() dateJalEvent = new EventEmitter<any>();

  constructor(private dateJalaliService: DateJalaliService) {
  }

  sendDateJal = ($event) => this.dateJalEvent.emit($event.inputElementValue);
  ngOnInit(): void {
    this.dateObject = this.dateJalaliService.getCurrentDate();
    this.dateJalEvent.emit(this.dateObject);
  }

}
