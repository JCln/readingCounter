import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationMessageRoutingModule } from './notification-message-routing.module';
import { NotificationMessageComponent } from './notification-message.component';


@NgModule({
  declarations: [
    NotificationMessageComponent
  ],
  imports: [
    CommonModule,
    NotificationMessageRoutingModule
  ]
})
export class NotificationMessageModule { }
