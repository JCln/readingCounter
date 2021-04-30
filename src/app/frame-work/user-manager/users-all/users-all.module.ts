import { NgModule } from '@angular/core';

import { SharedPrimeNgModule } from '../../../shared/shared-prime-ng.module';
import { UsersAllRoutingModule } from './users-all-routing.module';
import { UsersAllComponent } from './users-all.component';

@NgModule({
  declarations: [UsersAllComponent],
  imports: [
    SharedPrimeNgModule,
    UsersAllRoutingModule
  ]
})
export class UsersAllModule { }
