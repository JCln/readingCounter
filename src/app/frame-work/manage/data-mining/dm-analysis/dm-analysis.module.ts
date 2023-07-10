import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { DmAnalysisRoutingModule } from './dm-analysis-routing.module';
import { DmAnalysisComponent } from './dm-analysis.component';


@NgModule({
  declarations: [DmAnalysisComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    DmAnalysisRoutingModule
  ]
})
export class DmAnalysisModule { }
