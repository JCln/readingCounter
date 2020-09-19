import { Component, OnInit } from '@angular/core';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-date-jalali',
  templateUrl: './date-jalali.component.html',
  styleUrls: ['./date-jalali.component.scss']
})
export class DateJalaliComponent implements OnInit {
  dateObject = moment('1399-6-22', 'jYYYY,jMM,jDD');

  constructor() { }

  ngOnInit(): void {
  }

}
