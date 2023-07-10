import { NgModule } from '@angular/core';

import { DynamicTraverseRoutingModule } from './dynamic-traverse-routing.module';
import { DynamicTraverseComponent } from './dynamic-traverse.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    DynamicTraverseComponent
  ],
  imports: [
    SharedPrimeNgModule,
    DynamicTraverseRoutingModule
  ]
})
export class DynamicTraverseModule { }
