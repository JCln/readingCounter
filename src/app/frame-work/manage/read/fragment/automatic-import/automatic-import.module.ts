import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { AutoImportDgComponent } from './auto-import-dg/auto-import-dg.component';
import { AutomaticImportRoutingModule } from './automatic-import-routing.module';
import { AutomaticImportComponent } from './automatic-import.component';


@NgModule({
  declarations: [
    AutomaticImportComponent,
    AutoImportDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    AutomaticImportRoutingModule
  ]
})
export class AutomaticImportModule { }
