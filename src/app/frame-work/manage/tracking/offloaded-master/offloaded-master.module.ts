import { NgModule } from '@angular/core';

import { OffloadedMasterRoutingModule } from './offloaded-master-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { OffloadedMasterComponent } from './offloaded-master.component';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';


@NgModule({
  declarations: [
    OffloadedMasterComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedThreeModule,
    OffloadedMasterRoutingModule
  ]
})
export class OffloadedMasterModule { }
