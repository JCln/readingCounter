import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { ConfirmTextDialogComponent } from './confirm-text-dialog/confirm-text-dialog.component';
import { TrackingRoutingModule } from './tracking-routing.module';


@NgModule({
  declarations: [ConfirmTextDialogComponent],
  imports: [
    SharedModule,
    SharedThreeModule,
    TrackingRoutingModule
  ]
})
export class TrackingModule { }
