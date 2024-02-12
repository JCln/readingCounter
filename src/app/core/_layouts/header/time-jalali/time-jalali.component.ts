import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { DateJalaliService } from 'services/date-jalali.service';
import { Converter } from 'src/app/classes/converter';

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
    if (!this.timeObject || this.timeObject.length === 0) {
      this.timeObject = this.dateJalaliService.getCurrentTime();
      this.dateJalEvent.emit(Converter.persianToEngNumbers(this.timeObject));
    }
    else {
      this.dateJalEvent.emit(Converter.persianToEngNumbers($event.inputElementValue));
    }
  }
  ngAfterViewInit(): void {
    if (!this.timeObject || this.timeObject.length === 0) {
      this.timeObject = this.dateJalaliService.getCurrentTime();
      return;
    }
  }
}