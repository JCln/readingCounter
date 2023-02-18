import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { OffloadedGroupRoutingModule } from './offloaded-group-routing.module';
import { OffloadedGroupComponent } from './offloaded-group.component';


@NgModule({
  declarations: [
    OffloadedGroupComponent
  ],
  imports: [
    SharedPrimeNgModule,
    OffloadedGroupRoutingModule
  ]
})
export class OffloadedGroupModule { }
