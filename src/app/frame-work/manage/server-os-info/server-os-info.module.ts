import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerOsInfoRoutingModule } from './server-os-info-routing.module';
import { ServerOsInfoComponent } from './server-os-info.component';


@NgModule({
  declarations: [
    ServerOsInfoComponent
  ],
  imports: [
    CommonModule,
    ServerOsInfoRoutingModule
  ]
})
export class ServerOsInfoModule { }
