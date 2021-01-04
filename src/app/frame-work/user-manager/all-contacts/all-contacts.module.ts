import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';

import { AllContactsRoutingModule } from './all-contacts-routing.module';
import { AllContactsComponent } from './all-contacts.component';

@NgModule({
  declarations: [AllContactsComponent],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    MatCheckboxModule,
    MultiSelectModule,
    AllContactsRoutingModule
  ]
})
export class AllContactsModule { }
