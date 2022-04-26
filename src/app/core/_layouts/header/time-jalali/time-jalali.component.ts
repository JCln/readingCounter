import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { DateJalaliService } from 'services/date-jalali.service';

@Component({
  selector: 'app-time-jalali',
  templateUrl: './time-jalali.component.html',
  styleUrls: ['./time-jalali.component.scss']
})
export class TimeJalaliComponent implements AfterViewInit {
  datePickerConfig = {
    format: 'HH:MM',
    locale: 'fa',
  }
  @Output() dateJalEvent = new EventEmitter<any>();
  @Input() timeObject: string;

  constructor(private dateJalaliService: DateJalaliService) {
  }

  sendDateJal = ($event) => {
    console.log($event.inputElementValue);
    console.log(this.timeObject);

    if (!this.timeObject || this.timeObject.length === 0) {
      this.timeObject = this.dateJalaliService.getCurrentTime();

      this.dateJalEvent.emit(this.timeObject);
    }
    else {
      this.dateJalEvent.emit($event.inputElementValue);
    }
  }
  ngAfterViewInit(): void {
    if (!this.timeObject || this.timeObject.length === 0) {
      this.timeObject = this.dateJalaliService.getCurrentTime();
      console.log(this.timeObject);

      return;
    }
  }
}