import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ImportDynamicRoutingModule } from './import-dynamic-routing.module';
import { ImportDynamicComponent } from './import-dynamic.component';


@NgModule({
  declarations: [ImportDynamicComponent, ConfirmDialogComponent],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    SharedThreeModule,
    ImportDynamicRoutingModule
  ]
})
export class ImportDynamicModule { }
