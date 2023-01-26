import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { UserOnlinesRoutingModule } from './user-onlines-routing.module';
import { UserOnlinesComponent } from './user-onlines.component';
import { UserOnlinesDgComponent } from './user-onlines-dg/user-onlines-dg.component';


@NgModule({
  declarations: [
    UserOnlinesComponent,
    UserOnlinesDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    UserOnlinesRoutingModule
  ]
})
export class UserOnlinesModule { }
