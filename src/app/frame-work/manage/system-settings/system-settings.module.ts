import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemSettingsRoutingModule } from './system-settings-routing.module';
import { UserRoleHistoryDetailsComponent } from './user-role-history-details/user-role-history-details.component';


@NgModule({
  declarations: [
    UserRoleHistoryDetailsComponent
  ],
  imports: [
    CommonModule,
    SystemSettingsRoutingModule
  ]
})
export class SystemSettingsModule { }
