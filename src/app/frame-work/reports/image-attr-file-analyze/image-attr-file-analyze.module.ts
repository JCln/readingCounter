import { NgModule } from '@angular/core';
import { SharedChartsModule } from 'src/app/shared/shared-charts.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { BarImgAttrAnlzComponent } from './bar-img-attr-anlz/bar-img-attr-anlz.component';
import { ImageAttrFileAnalyzeRoutingModule } from './image-attr-file-analyze-routing.module';
import { ImageAttrFileAnalyzeComponent } from './image-attr-file-analyze.component';
import { PieImgAttrAnlzComponent } from './pie-img-attr-anlz/pie-img-attr-anlz.component';


@NgModule({
  declarations: [
    ImageAttrFileAnalyzeComponent,
    PieImgAttrAnlzComponent,
    BarImgAttrAnlzComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    SharedChartsModule,
    ImageAttrFileAnalyzeRoutingModule
  ]
})
export class ImageAttrFileAnalyzeModule { }
