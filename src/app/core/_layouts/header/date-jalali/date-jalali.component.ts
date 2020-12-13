import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { DateJalaliService } from './../../../../services/date-jalali.service';

@Component({
  selector: 'app-date-jalali',
  templateUrl: './date-jalali.component.html',
  styleUrls: ['./date-jalali.component.scss']
})
export class DateJalaliComponent implements OnInit {
  dateObject: any;

  @Output() dateJalEvent = new EventEmitter<any>();

  constructor(private dateJalaliService: DateJalaliService) {

  }

  // sendDateJal = () => this.dateJalEvent.emit(this.dateObject);
  sendDateJal = ($event) => console.log(this.dateObject + ',,, ' + $event);

  ngOnInit(): void {
    this.dateObject = this.dateJalaliService.getCurrentDate();
  }

}
