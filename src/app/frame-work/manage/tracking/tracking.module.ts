import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ConfirmTextDialogComponent } from './confirm-text-dialog/confirm-text-dialog.component';
import { TrackingRoutingModule } from './tracking-routing.module';


@NgModule({
  declarations: [ConfirmTextDialogComponent],
  imports: [
    TrackingRoutingModule,
    SharedModule
  ]
})
export class TrackingModule { }
