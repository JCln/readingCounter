import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProRoutingModule } from './pro-routing.module';
import { ProComponent } from './pro.component';


@NgModule({
  declarations: [ProComponent],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    ProRoutingModule
  ]
})
export class ProModule { }
