import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ReadingPeriodRoutingModule } from './reading-period-routing.module';
import { ReadingPeriodComponent } from './reading-period.component';
import { RpmAddDgComponent } from './rpm-add-dg/rpm-add-dg.component';
import { RpmEditDgComponent } from './rpm-edit-dg/rpm-edit-dg.component';


@NgModule({
  declarations: [ReadingPeriodComponent, RpmAddDgComponent, RpmEditDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ReadingPeriodRoutingModule
  ]
})
export class ReadingPeriodModule { }
