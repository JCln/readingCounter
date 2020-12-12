import { NgModule } from '@angular/core';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';

import { SharedModule } from './../../shared/shared.module';
import { ImportDynamicRoutingModule } from './import-dynamic-routing.module';
import { ImportDynamicComponent } from './import-dynamic.component';


@NgModule({
  declarations: [ImportDynamicComponent],
  imports: [
    SharedModule,
    DpDatePickerModule,
    ImportDynamicRoutingModule
  ]
})
export class ImportDynamicModule { }
