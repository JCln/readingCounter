import { NgModule } from '@angular/core';

import { ByuseridRoutingModule } from './byuserid-routing.module';
import { ByuseridComponent } from './byuserid.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    ByuseridComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ByuseridRoutingModule
  ]
})
export class ByuseridModule { }
