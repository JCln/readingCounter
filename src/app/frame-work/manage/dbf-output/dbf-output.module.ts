import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { DbfOutputRoutingModule } from './dbf-output-routing.module';
import { DbfOutputComponent } from './dbf-output.component';


@NgModule({
  declarations: [DbfOutputComponent],
  imports: [
    SharedModule,
    SharedThreeModule,
    SharedPrimeNgModule,
    DbfOutputRoutingModule
  ]
})
export class DbfOutputModule { }
