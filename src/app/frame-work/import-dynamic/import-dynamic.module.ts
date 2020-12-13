import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { SharedThreeModule } from './../../shared/shared_three.module';
import { ImportDynamicRoutingModule } from './import-dynamic-routing.module';
import { ImportDynamicComponent } from './import-dynamic.component';


@NgModule({
  declarations: [ImportDynamicComponent],
  imports: [
    SharedModule,
    SharedThreeModule,
    ImportDynamicRoutingModule
  ]
})
export class ImportDynamicModule { }
