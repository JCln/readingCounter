import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { Auth2AddDgComponent } from './auth2-add-dg/auth2-add-dg.component';
import { Auth2RoutingModule } from './auth2-routing.module';
import { Auth2Component } from './auth2.component';


@NgModule({
  declarations: [Auth2Component, Auth2AddDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    Auth2RoutingModule
  ]
})
export class Auth2Module { }
