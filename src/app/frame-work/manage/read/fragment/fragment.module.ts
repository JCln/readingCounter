import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { AutoImportDgComponent } from './automatic-import/auto-import-dg/auto-import-dg.component';
import { AutomaticImportComponent } from './automatic-import/automatic-import.component';
import { FragmentRoutingModule } from './fragment-routing.module';
import { FragmentComponent } from './fragment.component';
import { AutoImportEditDgComponent } from './automatic-import/auto-import-edit-dg/auto-import-edit-dg.component';
import { FragmentAddDgComponent } from './fragment-add-dg/fragment-add-dg.component';


@NgModule({
  declarations: [FragmentComponent, AutomaticImportComponent, AutoImportDgComponent, AutoImportEditDgComponent, FragmentAddDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    FragmentRoutingModule
  ]
})
export class FragmentModule { }
