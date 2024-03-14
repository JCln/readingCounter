import { NgModule } from '@angular/core';

import { MyPreviousloginsRoutingModule } from './my-previouslogins-routing.module';
import { MyPreviousloginsComponent } from './my-previouslogins.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [MyPreviousloginsComponent],
  imports: [
    SharedPrimeNgModule,
    MyPreviousloginsRoutingModule
  ]
})
export class MyPreviousloginsModule { }
