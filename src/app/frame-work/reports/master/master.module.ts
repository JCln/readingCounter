import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';


@NgModule({
  declarations: [MasterComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    MasterRoutingModule
  ]
})
export class MasterModule { }
