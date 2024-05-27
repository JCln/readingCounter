import { NgModule } from '@angular/core';

import { RequestDraftGetlazyRoutingModule } from './request-draft-getlazy-routing.module';
import { RequestDraftGetlazyComponent } from './request-draft-getlazy.component';
import { RequestDraftDgComponent } from './request-draft-dg/request-draft-dg.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    RequestDraftGetlazyComponent,
    RequestDraftDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    RequestDraftGetlazyRoutingModule
  ]
})
export class RequestDraftGetlazyModule { }
