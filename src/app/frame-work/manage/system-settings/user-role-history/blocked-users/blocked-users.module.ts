import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockedUsersRoutingModule } from './blocked-users-routing.module';
import { BlockedUsersComponent } from './blocked-users.component';


@NgModule({
  declarations: [
    BlockedUsersComponent
  ],
  imports: [
    CommonModule,
    BlockedUsersRoutingModule
  ]
})
export class BlockedUsersModule { }
