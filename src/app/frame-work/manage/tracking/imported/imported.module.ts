import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { ImportListDgComponent } from './import-list-dg/import-list-dg.component';
import { ImportedRoutingModule } from './imported-routing.module';
import { ImportedComponent } from './imported.component';


@NgModule({
  declarations: [ImportedComponent, ImportListDgComponent],
  imports: [
    SharedPrimeNgModule,
    MatSelectModule,
    ImportedRoutingModule
  ],
  entryComponents: [
    ImportListDgComponent
  ],
  providers: [DialogService]
})
export class ImportedModule { }
