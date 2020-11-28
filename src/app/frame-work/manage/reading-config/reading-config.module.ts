import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../../shared/shared.module';
import { ReadingConfigRoutingModule } from './reading-config-routing.module';
import { ReadingConfigComponent } from './reading-config.component';
import { RdAddDgComponent } from './rd-add-dg/rd-add-dg.component';
import { RdEditDgComponent } from './rd-edit-dg/rd-edit-dg.component';


@NgModule({
  declarations: [ReadingConfigComponent, RdAddDgComponent, RdEditDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,    
    ReadingConfigRoutingModule
  ]
})
export class ReadingConfigModule { }
