import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ManageRoutingModule } from './manage-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    ManageRoutingModule
  ]
})
export class ManageModule { }
