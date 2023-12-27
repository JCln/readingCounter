import { NgModule } from '@angular/core';

import { OffloadedMasterRoutingModule } from './offloaded-master-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { OffloadedMasterComponent } from './offloaded-master.component';


@NgModule({
  declarations: [
    OffloadedMasterComponent
  ],
  imports: [
    SharedPrimeNgModule,
    OffloadedMasterRoutingModule
  ]
})
export class OffloadedMasterModule { }
