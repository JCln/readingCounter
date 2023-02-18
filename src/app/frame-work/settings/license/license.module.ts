import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenseRoutingModule } from './license-routing.module';
import { LicenseComponent } from './license.component';


@NgModule({
  declarations: [
    LicenseComponent
  ],
  imports: [
    CommonModule,
    LicenseRoutingModule
  ]
})
export class LicenseModule { }
