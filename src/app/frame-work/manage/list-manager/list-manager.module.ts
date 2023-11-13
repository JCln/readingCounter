import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
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
    BriefKardexComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedCarouselModule,
    ListManagerRoutingModule
  ]
})
export class ListManagerModule { }
