import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { KarkardDaylyResComponent } from './karkard-dayly-res/karkard-dayly-res.component';
import { KarkardDaylyRoutingModule } from './karkard-dayly-routing.module';
import { KarkardDaylyComponent } from './karkard-dayly.component';


@NgModule({
  declarations: [KarkardDaylyComponent, KarkardDaylyResComponent],
  imports: [
    SharedModule,
    SharedThreeModule,
    SharedPrimeNgModule,
    KarkardDaylyRoutingModule
  ]
})
export class KarkardDaylyModule { }
