import { NgModule } from '@angular/core';

import { ListLatestInfoRoutingModule } from './list-latest-info-routing.module';
import { ListLatestInfoComponent } from './list-latest-info.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    ListLatestInfoComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ListLatestInfoRoutingModule
  ]
})
export class ListLatestInfoModule { }
