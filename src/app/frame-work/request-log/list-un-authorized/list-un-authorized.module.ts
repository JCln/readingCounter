import { NgModule } from '@angular/core';

import { ListUnAuthorizedRoutingModule } from './list-un-authorized-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { ListUnAuthorizedComponent } from './list-un-authorized.component';


@NgModule({
  declarations: [
    ListUnAuthorizedComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ListUnAuthorizedRoutingModule
  ]
})
export class ListUnAuthorizedModule { }
