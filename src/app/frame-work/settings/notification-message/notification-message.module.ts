import { NgModule } from '@angular/core';

import { NotificationMessageRoutingModule } from './notification-message-routing.module';
import { NotificationMessageComponent } from './notification-message.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    NotificationMessageComponent
  ],
  imports: [
    SharedPrimeNgModule,
    NotificationMessageRoutingModule
  ]
})
export class NotificationMessageModule { }
