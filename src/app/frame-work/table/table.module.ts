import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';


@NgModule({
  declarations: [TableComponent],
  imports: [
    SharedModule,
    TableRoutingModule
  ]
})
export class TableModule { }
