import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedSortByModule } from 'src/app/shared/shared-sort-by';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { SimpleRoutingModule } from './simple-routing.module';
import { SimpleComponent } from './simple.component';


@NgModule({
  declarations: [
    SimpleComponent
  ],
  imports: [
    SharedThreeModule,
    SharedModule,
    SharedPrimeNgModule,
    SharedSortByModule,
    SimpleRoutingModule
  ]
})
export class SimpleModule { }
