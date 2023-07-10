import { NgModule } from '@angular/core';

import { UserDetailsHistoryRoutingModule } from './user-details-history-routing.module';
import { UserDetailsHistoryComponent } from './user-details-history.component';
import { UserMdSelectActionComponent } from './user-md-select-action/user-md-select-action.component';
import { UserMdSelectZoneComponent } from './user-md-select-zone/user-md-select-zone.component';
import { UserMdUserInputComponent } from './user-md-user-input/user-md-user-input.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UserDetailsHistoryComponent,
    UserMdSelectActionComponent,
    UserMdSelectZoneComponent,
    UserMdUserInputComponent
  ],
  imports: [
    SharedModule,
    UserDetailsHistoryRoutingModule
  ]
})
export class UserDetailsHistoryModule { }
