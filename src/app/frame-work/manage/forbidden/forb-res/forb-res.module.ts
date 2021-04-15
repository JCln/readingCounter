import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { ForbResRoutingModule } from './forb-res-routing.module';
import { ForbResComponent } from './forb-res.component';


@NgModule({
  declarations: [ForbResComponent],
  imports: [
    SharedPrimeNgModule,
    ForbResRoutingModule
  ]
})
export class ForbResModule { }
