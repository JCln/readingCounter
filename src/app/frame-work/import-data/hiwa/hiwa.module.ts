import { NgModule } from '@angular/core';

import { HiwaRoutingModule } from './hiwa-routing.module';
import { HiwaComponent } from './hiwa.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HiwaComponent
  ],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    SharedThreeModule,
    HiwaRoutingModule
  ]
})
export class HiwaModule { }
