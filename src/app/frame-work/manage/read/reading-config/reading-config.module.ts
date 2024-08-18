import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ReadingConfigRoutingModule } from './reading-config-routing.module';
import { ReadingConfigComponent } from './reading-config.component';
import { ReadingConfigDgComponent } from './reading-config-dg/reading-config-dg.component';


@NgModule({
  declarations: [ReadingConfigComponent, ReadingConfigDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    ReadingConfigRoutingModule
  ]
})
export class ReadingConfigModule { }
