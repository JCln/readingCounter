import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { RdAddDgComponent } from './rd-add-dg/rd-add-dg.component';
import { RdEditDgComponent } from './rd-edit-dg/rd-edit-dg.component';
import { ReadingConfigRoutingModule } from './reading-config-routing.module';
import { ReadingConfigComponent } from './reading-config.component';


@NgModule({
  declarations: [ReadingConfigComponent, RdAddDgComponent, RdEditDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    ReadingConfigRoutingModule
  ]
})
export class ReadingConfigModule { }
