import { NgModule } from '@angular/core';

import { ActivationUserRoutingModule } from './activation-user-routing.module';
import { ActivationUserComponent } from './activation-user.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';


@NgModule({
  declarations: [
    ActivationUserComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedCollapseModule,
    ActivationUserRoutingModule
  ]
})
export class ActivationUserModule { }
