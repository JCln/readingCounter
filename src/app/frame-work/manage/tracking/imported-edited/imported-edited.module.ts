import { NgModule } from '@angular/core';
import { ImportedEditedRoutingModule } from './imported-edited-routing.module';
import { ImportedEditedComponent } from './imported-edited.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedSortByModule } from 'src/app/shared/shared-sort-by';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';


@NgModule({
  declarations: [
    ImportedEditedComponent
  ],
  imports: [
    SharedThreeModule,
    SharedPrimeNgModule,
    SharedSortByModule,
    ImportedEditedRoutingModule
  ]
})
export class ImportedEditedModule { }
