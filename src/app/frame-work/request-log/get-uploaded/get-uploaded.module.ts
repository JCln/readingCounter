import { NgModule } from '@angular/core';

import { GetUploadedRoutingModule } from './get-uploaded-routing.module';
import { GetUploadedComponent } from './get-uploaded.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';


@NgModule({
  declarations: [
    GetUploadedComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedCollapseModule,
    GetUploadedRoutingModule
  ]
})
export class GetUploadedModule { }
