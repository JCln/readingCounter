import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { Auth3AddDgComponent } from './auth3-add-dg/auth3-add-dg.component';
import { Auth3RoutingModule } from './auth3-routing.module';
import { Auth3Component } from './auth3.component';


@NgModule({
  declarations: [Auth3Component, Auth3AddDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    Auth3RoutingModule
  ]
})
export class Auth3Module { }
