import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

import { SharedModule } from './../../shared/shared.module';
import { SharedThreeModule } from './../../shared/shared_three.module';
import { ImportDynamicRoutingModule } from './import-dynamic-routing.module';
import { ImportDynamicComponent } from './import-dynamic.component';


@NgModule({
  declarations: [ImportDynamicComponent, ConfirmDialogComponent],
  imports: [
    SharedModule,
    SharedThreeModule,
    ImportDynamicRoutingModule
  ]
})
export class ImportDynamicModule { }
