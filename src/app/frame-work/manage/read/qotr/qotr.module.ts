import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { QotrRoutingModule } from './qotr-routing.module';
import { QotrComponent } from './qotr.component';


@NgModule({
  declarations: [QotrComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    QotrRoutingModule
  ]
})
export class QotrModule { }
