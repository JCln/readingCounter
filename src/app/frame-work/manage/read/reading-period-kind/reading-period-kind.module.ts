import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ReadingPeriodKindRoutingModule } from './reading-period-kind-routing.module';
import { ReadingPeriodKindComponent } from './reading-period-kind.component';
import { RpkmAddDgComponent } from './rpkm-add-dg/rpkm-add-dg.component';
import { RpkmEditDgComponent } from './rpkm-edit-dg/rpkm-edit-dg.component';


@NgModule({
  declarations: [ReadingPeriodKindComponent, RpkmEditDgComponent, RpkmAddDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ReadingPeriodKindRoutingModule
  ]
})
export class ReadingPeriodKindModule { }
