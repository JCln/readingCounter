import { NgModule } from '@angular/core';

import { AutomaticImportRoutingModule } from './automatic-import-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { AutomaticImportComponent } from './automatic-import.component';
import { AutoImportDgComponent } from './auto-import-dg/auto-import-dg.component';
import { AutoImportEditDgComponent } from './auto-import-edit-dg/auto-import-edit-dg.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AutomaticImportComponent,
    AutoImportDgComponent,
    AutoImportEditDgComponent
  ],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    AutomaticImportRoutingModule
  ]
})
export class AutomaticImportModule { }
