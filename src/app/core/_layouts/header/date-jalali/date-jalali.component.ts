import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { DateJalaliService } from 'services/date-jalali.service';


@Component({
  selector: 'app-date-jalali',
  templateUrl: './date-jalali.component.html',
  styleUrls: ['./date-jalali.component.scss']
})
export class DateJalaliComponent implements AfterViewInit {
  datePickerConfig = {
    format: 'YYYY/MM/DD',
    locale: 'fa',
  }
  @Output() dateJalEvent = new EventEmitter<any>();
  @Input() dateObject: string;

  constructor(private dateJalaliService: DateJalaliService) {
  }

  sendDateJal = ($event) => {
    this.dateJalEvent.emit($event.inputElementValue);
  }
  ngAfterViewInit(): void {
    if (!this.dateObject || this.dateObject.length === 0) {
      this.dateObject = this.dateJalaliService.getCurrentDate();
      return;
    }
  }
}
