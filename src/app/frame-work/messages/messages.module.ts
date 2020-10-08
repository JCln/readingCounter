import { NgModule } from '@angular/core';

import { SharedTwoModule } from './../../shared/shared-two.module';
import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';


@NgModule({
  declarations: [MessagesComponent],
  imports: [
    SharedTwoModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
