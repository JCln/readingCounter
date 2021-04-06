import { NgModule } from '@angular/core';
import { AddRowDirective } from 'src/app/directives/add-row.directive';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { FragmentRoutingModule } from './fragment-routing.module';
import { FragmentComponent } from './fragment.component';


@NgModule({
  declarations: [FragmentComponent, AddRowDirective],
  imports: [
    SharedPrimeNgModule,
    FragmentRoutingModule
  ]
})
export class FragmentModule { }
