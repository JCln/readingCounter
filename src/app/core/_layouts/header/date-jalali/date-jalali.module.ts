import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';

import { DateJalaliRoutingModule } from './date-jalali-routing.module';
import { DateJalaliComponent } from './date-jalali.component';

@NgModule({
  declarations: [DateJalaliComponent],
  imports: [
    CommonModule,
    FormsModule,
    DpDatePickerModule,
    DateJalaliRoutingModule
  ]
})
export class DateJalaliModule {
  static components = {
    lazy: DateJalaliComponent
  };
}
