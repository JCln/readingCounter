import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { SharedThreeModule } from './../../../shared/shared_three.module';
import { DbfOutputRoutingModule } from './dbf-output-routing.module';
import { DbfOutputComponent } from './dbf-output.component';


@NgModule({
  declarations: [DbfOutputComponent],
  imports: [
    SharedModule,
    SharedThreeModule,
    DbfOutputRoutingModule
  ]
})
export class DbfOutputModule { }
