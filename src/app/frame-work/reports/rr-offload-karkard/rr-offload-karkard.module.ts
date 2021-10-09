import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { RrOffloadKarkardRoutingModule } from './rr-offload-karkard-routing.module';
import { RrOffloadKarkardComponent } from './rr-offload-karkard.component';


@NgModule({
  declarations: [
    RrOffloadKarkardComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    RrOffloadKarkardRoutingModule
  ]
})
export class RrOffloadKarkardModule { }
