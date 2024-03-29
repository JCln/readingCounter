import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { DateJalaliService } from 'services/date-jalali.service';
import { Converter } from 'src/app/classes/converter';


@Component({
  selector: 'app-date-jalali',
  templateUrl: './date-jalali.component.html',
  styleUrls: ['./date-jalali.component.scss']
})
export class DateJalaliComponent implements AfterViewInit {
  datePickerConfig = {
    format: 'YYYY/MM/DD',
    locale: 'fa'
  }
  @Output() dateJalEvent = new EventEmitter<any>();
  @Input() dateObject: string;
  @Input() readonly _mode: string = 'day';
  @Input() readonly _disabled: boolean = false;

  constructor(private dateJalaliService: DateJalaliService) {
  }

  sendDateJal = ($event, hasFirstVal?: boolean) => {
    if (hasFirstVal) {
      this.dateJalEvent.emit(Converter.persianToEngNumbers(this.dateObject));
    }
    else {
      this.dateJalEvent.emit(Converter.persianToEngNumbers($event.inputElementValue));
    }
  }
  ngAfterViewInit(): void {
    if (!this.dateObject || this.dateObject.length === 0) {
      this.dateObject = this.dateJalaliService.getCurrentDate();
      this.sendDateJal('', true);
    }
  }
}
