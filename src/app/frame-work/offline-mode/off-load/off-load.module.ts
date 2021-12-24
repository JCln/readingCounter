import { NgModule } from '@angular/core';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { OffLoadRoutingModule } from './off-load-routing.module';
import { OffLoadComponent } from './off-load.component';


@NgModule({
  declarations: [
    OffLoadComponent
  ],
  imports: [
    SharedTwoModule,
    OffLoadRoutingModule
  ]
})
export class OffLoadModule { }
