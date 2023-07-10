import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { ApkRoutingModule } from './apk-routing.module';
import { ApkComponent } from './apk.component';


@NgModule({
  declarations: [ApkComponent],
  imports: [
    SharedPrimeNgModule,
    ApkRoutingModule
  ]
})
export class ApkModule { }
