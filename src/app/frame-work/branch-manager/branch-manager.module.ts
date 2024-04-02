import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchManagerRoutingModule } from './branch-manager-routing.module';
import { TarrifTypeItemComponent } from './tarrif-type-item/tarrif-type-item.component';


@NgModule({
  declarations: [
    TarrifTypeItemComponent
  ],
  imports: [
    CommonModule,
    BranchManagerRoutingModule
  ]
})
export class BranchManagerModule { }
