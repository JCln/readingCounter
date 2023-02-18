import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedSortByModule } from 'src/app/shared/shared-sort-by';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { KarkardAllStatesRoutingModule } from './karkard-all-states-routing.module';
import { KarkardAllStatesComponent } from './karkard-all-states.component';


@NgModule({
  declarations: [
    KarkardAllStatesComponent
  ],
  imports: [
    SharedModule,
    SharedThreeModule,
    SharedPrimeNgModule,
    SharedSortByModule,
    KarkardAllStatesRoutingModule
  ]
})
export class KarkardAllStatesModule { }
