import { NgModule } from '@angular/core';

import { TagManagerRoutingModule } from './tag-manager-routing.module';
import { TagManagerComponent } from './tag-manager.component';
import { TagDgComponent } from './tag-dg/tag-dg.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    TagManagerComponent,
    TagDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    TagManagerRoutingModule
  ]
})
export class TagManagerModule { }
