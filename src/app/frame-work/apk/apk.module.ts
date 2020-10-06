import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { ApkRoutingModule } from './apk-routing.module';
import { ApkComponent } from './apk.component';


@NgModule({
  declarations: [ApkComponent],
  imports: [
    SharedModule,
    ApkRoutingModule
  ]
})
export class ApkModule { }
