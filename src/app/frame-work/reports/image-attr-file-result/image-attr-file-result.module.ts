import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { ImageAttrFileResultRoutingModule } from './image-attr-file-result-routing.module';
import { ImageAttrFileResultComponent } from './image-attr-file-result.component';


@NgModule({
  declarations: [
    ImageAttrFileResultComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    ImageAttrFileResultRoutingModule
  ]
})
export class ImageAttrFileResultModule { }
