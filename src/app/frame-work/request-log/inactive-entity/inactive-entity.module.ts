import { NgModule } from '@angular/core';

import { InactiveEntityRoutingModule } from './inactive-entity-routing.module';
import { InactiveEntityComponent } from './inactive-entity.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    InactiveEntityComponent
  ],
  imports: [
    SharedPrimeNgModule,
    InactiveEntityRoutingModule
  ]
})
export class InactiveEntityModule { }
