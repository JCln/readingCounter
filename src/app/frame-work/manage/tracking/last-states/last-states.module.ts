import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { LastStatesRoutingModule } from './last-states-routing.module';
import { LastStatesComponent } from './last-states.component';


@NgModule({
  declarations: [LastStatesComponent],
  imports: [
    SharedPrimeNgModule,
    LastStatesRoutingModule
  ]
})
export class LastStatesModule { }
