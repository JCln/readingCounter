import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AssessPreRoutingModule } from './assess-pre-routing.module';
import { AssessPreComponent } from './assess-pre.component';
import { AssesspreDgComponent } from './assesspre-dg/assesspre-dg.component';


@NgModule({
  declarations: [AssessPreComponent, AssesspreDgComponent],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    AssessPreRoutingModule
  ]
})
export class AssessPreModule { }
