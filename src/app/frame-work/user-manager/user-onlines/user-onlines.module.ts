import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserOnlinesDgComponent } from './user-onlines-dg/user-onlines-dg.component';
import { UserOnlinesRoutingModule } from './user-onlines-routing.module';
import { UserOnlinesComponent } from './user-onlines.component';
import { UserOnlinesImgDgComponent } from './user-onlines-img-dg/user-onlines-img-dg.component';


@NgModule({
  declarations: [
    UserOnlinesComponent,
    UserOnlinesDgComponent,
    UserOnlinesImgDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    UserOnlinesRoutingModule
  ]
})
export class UserOnlinesModule { }
