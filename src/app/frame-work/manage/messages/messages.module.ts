import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';


@NgModule({
  declarations: [MessagesComponent],
  imports: [
    SharedModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
