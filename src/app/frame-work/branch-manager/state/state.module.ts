import { NgModule } from '@angular/core';

import { StateRoutingModule } from './state-routing.module';
import { StateComponent } from './state.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    StateComponent
  ],
  imports: [
    SharedPrimeNgModule,
    StateRoutingModule
  ]
})
export class StateModule { }
