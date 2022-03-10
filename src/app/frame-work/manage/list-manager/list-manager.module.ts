import { NgModule } from '@angular/core';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { CarouselWoumComponent } from './all/carousel-woum/carousel-woum.component';
import { WoumComponent } from './all/carousel-woum/woum/woum.component';
import { MapDgComponent } from './all/map-dg/map-dg.component';
import { ListManagerRoutingModule } from './list-manager-routing.module';


@NgModule({
  declarations: [
    MapDgComponent,
    CarouselWoumComponent,
    WoumComponent
  ],
  imports: [
    SharedTwoModule,
    ListManagerRoutingModule
  ]
})
export class ListManagerModule { }
