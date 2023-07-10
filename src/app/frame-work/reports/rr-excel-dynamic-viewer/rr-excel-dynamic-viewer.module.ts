import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { ConfirmDialogExcelViewComponent } from './confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { RrExcelDynamicViewerRoutingModule } from './rr-excel-dynamic-viewer-routing.module';
import { RrExcelDynamicViewerComponent } from './rr-excel-dynamic-viewer.component';


@NgModule({
  declarations: [
    RrExcelDynamicViewerComponent,
    ConfirmDialogExcelViewComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    ReactiveFormsModule,
    RrExcelDynamicViewerRoutingModule
  ]
})
export class RrExcelDynamicViewerModule { }
