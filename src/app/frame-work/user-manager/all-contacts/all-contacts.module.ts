import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';

import { AllContactsRoutingModule } from './all-contacts-routing.module';
import { AllContactsComponent } from './all-contacts.component';

@NgModule({
  declarations: [AllContactsComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    AllContactsRoutingModule
  ]
})
export class AllContactsModule { }
