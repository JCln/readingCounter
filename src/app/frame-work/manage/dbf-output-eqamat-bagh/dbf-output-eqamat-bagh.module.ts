import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { DbfOutputEqamatBaghRoutingModule } from './dbf-output-eqamat-bagh-routing.module';
import { DbfOutputEqamatBaghComponent } from './dbf-output-eqamat-bagh.component';


@NgModule({
  declarations: [
    DbfOutputEqamatBaghComponent
  ],
  imports: [
    SharedModule,
    SharedThreeModule,
    SharedPrimeNgModule,
    DbfOutputEqamatBaghRoutingModule
  ]
})
export class DbfOutputEqamatBaghModule { }
