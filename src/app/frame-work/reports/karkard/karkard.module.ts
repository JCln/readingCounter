import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { KarkardResComponent } from './karkard-res/karkard-res.component';
import { KarkardRoutingModule } from './karkard-routing.module';
import { KarkardComponent } from './karkard.component';


@NgModule({
  declarations: [KarkardComponent, KarkardResComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    KarkardRoutingModule
  ]
})
export class KarkardModule { }
