import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserManagerRoutingModule } from './user-manager-routing.module';
import { ProvinceItemsComponent } from './province-items/province-items.component';


@NgModule({
  declarations: [ProvinceItemsComponent],
  imports: [
    CommonModule,    
    UserManagerRoutingModule
  ]
})
export class UserManagerModule { }
