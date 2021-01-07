import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { ImportedRoutingModule } from './imported-routing.module';
import { ImportedComponent } from './imported.component';


@NgModule({
  declarations: [ImportedComponent],
  imports: [
    SharedPrimeNgModule,
    ImportedRoutingModule
  ]
})
export class ImportedModule { }
