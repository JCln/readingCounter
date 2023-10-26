import { NgModule } from '@angular/core';

import { BlockedUsersRoutingModule } from './blocked-users-routing.module';
import { BlockedUsersComponent } from './blocked-users.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    BlockedUsersComponent
  ],
  imports: [
    SharedPrimeNgModule,
    BlockedUsersRoutingModule
  ]
})
export class BlockedUsersModule { }
