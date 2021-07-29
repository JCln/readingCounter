import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { SimafaSingleRoutingModule } from './simafa-single-routing.module';
import { SimafaSingleComponent } from './simafa-single.component';


@NgModule({
  declarations: [SimafaSingleComponent],
  imports: [
    SharedModule,
    SimafaSingleRoutingModule
  ]
})
export class SimafaSingleModule { }
