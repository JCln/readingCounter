import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { Auth1AddDgComponent } from './auth1-add-dg/auth1-add-dg.component';
import { Auth1RoutingModule } from './auth1-routing.module';
import { Auth1Component } from './auth1.component';

@NgModule({
  declarations: [Auth1Component, Auth1AddDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    Auth1RoutingModule
  ]
})
export class Auth1Module { }
