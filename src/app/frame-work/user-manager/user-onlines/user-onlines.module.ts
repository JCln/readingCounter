import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { UserOnlinesDgComponent } from './user-onlines-dg/user-onlines-dg.component';
import { UserOnlinesImgDgComponent } from './user-onlines-img-dg/user-onlines-img-dg.component';
import { UserOnlinesRoutingModule } from './user-onlines-routing.module';
import { UserOnlinesComponent } from './user-onlines.component';


@NgModule({
  declarations: [
    UserOnlinesComponent,
    UserOnlinesDgComponent,
    UserOnlinesImgDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    UserOnlinesRoutingModule
  ]
})
export class UserOnlinesModule { }
