import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedSortByModule } from 'src/app/shared/shared-sort-by';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { TraverseRoutingModule } from './traverse-routing.module';
import { TraverseComponent } from './traverse.component';


@NgModule({
  declarations: [TraverseComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    SharedSortByModule,
    TraverseRoutingModule
  ]
})
export class TraverseModule { }
