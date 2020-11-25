import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';

import { AllContactsRoutingModule } from './all-contacts-routing.module';
import { AllContactsComponent } from './all-contacts.component';
import { BtnCellRendererComponent } from './btn-cell-renderer/btn-cell-renderer.component';
import { CheckboxRenderer } from './checkbox-renderer.componenet';

@NgModule({
  declarations: [AllContactsComponent, BtnCellRendererComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([BtnCellRendererComponent, CheckboxRenderer]),
    AllContactsRoutingModule
  ]
})
export class AllContactsModule { }
