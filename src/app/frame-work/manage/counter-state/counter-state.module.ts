import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';

import { CheckboxRenderer } from '../../checkbox-renderer.componenet';
import { BtnCellRendererComponent } from '../../user-manager/all-contacts/btn-cell-renderer/btn-cell-renderer.component';
import { CounterStateRoutingModule } from './counter-state-routing.module';
import { CounterStateComponent } from './counter-state.component';


@NgModule({
  declarations: [CounterStateComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([CheckboxRenderer, BtnCellRendererComponent]),
    CounterStateRoutingModule
  ]
})
export class CounterStateModule { }
