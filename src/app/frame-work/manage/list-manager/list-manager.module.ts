import { NgModule } from '@angular/core';
import { ListSearchMoshWoumComponent } from 'src/app/shared/list-search-mosh-woum/list-search-mosh-woum.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedCarouselModule } from 'src/app/shared/shared_carousel';

import { MapDgComponent } from './all/map-dg/map-dg.component';
import { BriefKardexComponent } from './brief-kardex/brief-kardex.component';
import { ListManagerRoutingModule } from './list-manager-routing.module';
import { ListSearchMoshDgComponent } from './list-search-mosh-dg/list-search-mosh-dg.component';


@NgModule({
  declarations: [
    MapDgComponent,
    ListSearchMoshDgComponent,
    ListSearchMoshWoumComponent,
    BriefKardexComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedTwoModule,
    SharedCarouselModule,
    ListManagerRoutingModule
  ]
})
export class ListManagerModule { }
