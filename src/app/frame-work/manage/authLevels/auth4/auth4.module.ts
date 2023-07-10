import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { Auth4AddDgComponent } from './auth4-add-dg/auth4-add-dg.component';
import { Auth4RoutingModule } from './auth4-routing.module';
import { Auth4Component } from './auth4.component';


@NgModule({
  declarations: [Auth4Component, Auth4AddDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    Auth4RoutingModule
  ]
})
export class Auth4Module { }
