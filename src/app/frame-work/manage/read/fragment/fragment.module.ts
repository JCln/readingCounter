import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { FragmentRoutingModule } from './fragment-routing.module';
import { FragmentComponent } from './fragment.component';


@NgModule({
  declarations: [FragmentComponent],
  imports: [
    SharedPrimeNgModule,
    FragmentRoutingModule
  ]
})
export class FragmentModule { }
