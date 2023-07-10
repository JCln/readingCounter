import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';


@NgModule({
  declarations: [MessagesComponent],
  imports: [
    SharedPrimeNgModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
