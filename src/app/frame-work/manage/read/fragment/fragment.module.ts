import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { FragmentRoutingModule } from './fragment-routing.module';
import { FragmentComponent } from './fragment.component';
import { FragmentAddDgComponent } from './fragment-add-dg/fragment-add-dg.component';


@NgModule({
  declarations: [FragmentComponent, FragmentAddDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    FragmentRoutingModule
  ]
})
export class FragmentModule { }
