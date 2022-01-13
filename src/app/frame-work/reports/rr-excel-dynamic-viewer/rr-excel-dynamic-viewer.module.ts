import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { RrExcelDynamicViewerRoutingModule } from './rr-excel-dynamic-viewer-routing.module';
import { RrExcelDynamicViewerComponent } from './rr-excel-dynamic-viewer.component';


@NgModule({
  declarations: [
    RrExcelDynamicViewerComponent
  ],
  imports: [
    SharedPrimeNgModule,
    RrExcelDynamicViewerRoutingModule
  ]
})
export class RrExcelDynamicViewerModule { }
