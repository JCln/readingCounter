import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { QotrRoutingModule } from './qotr-routing.module';
import { QotrComponent } from './qotr.component';
import { QotrEditDgComponent } from './qotr-edit-dg/qotr-edit-dg.component';
import { QotrAddDgComponent } from './qotr-add-dg/qotr-add-dg.component';


@NgModule({
  declarations: [QotrComponent, QotrEditDgComponent, QotrAddDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    QotrRoutingModule
  ]
})
export class QotrModule { }
