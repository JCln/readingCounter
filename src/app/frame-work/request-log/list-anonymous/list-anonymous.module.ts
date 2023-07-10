import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { NgModule } from '@angular/core';

import { ListAnonymousRoutingModule } from './list-anonymous-routing.module';
import { ListAnonymousComponent } from './list-anonymous.component';


@NgModule({
  declarations: [
    ListAnonymousComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ListAnonymousRoutingModule
  ]
})
export class ListAnonymousModule { }
