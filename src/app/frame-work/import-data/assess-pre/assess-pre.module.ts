import { NgModule } from '@angular/core';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AssessPreRoutingModule } from './assess-pre-routing.module';
import { AssessPreComponent } from './assess-pre.component';


@NgModule({
  declarations: [AssessPreComponent],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    SharedCollapseModule,
    AssessPreRoutingModule
  ]
})
export class AssessPreModule { }
