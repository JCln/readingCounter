import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { UserOnlinesRoutingModule } from './user-onlines-routing.module';
import { UserOnlinesComponent } from './user-onlines.component';


@NgModule({
  declarations: [
    UserOnlinesComponent
  ],
  imports: [
    SharedPrimeNgModule,
    UserOnlinesRoutingModule
  ]
})
export class UserOnlinesModule { }
