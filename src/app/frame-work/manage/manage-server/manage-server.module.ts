import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManageServerRoutingModule } from './manage-server-routing.module';
import { ManageServerComponent } from './manage-server.component';


@NgModule({
  declarations: [ManageServerComponent],
  imports: [
    CommonModule,
    ManageServerRoutingModule
  ]
})
export class ManageServerModule { }
