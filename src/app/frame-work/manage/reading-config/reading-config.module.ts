import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../../shared/shared.module';
import { ReadingConfigRoutingModule } from './reading-config-routing.module';
import { ReadingConfigComponent } from './reading-config.component';


@NgModule({
  declarations: [ReadingConfigComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,    
    ReadingConfigRoutingModule
  ]
})
export class ReadingConfigModule { }
