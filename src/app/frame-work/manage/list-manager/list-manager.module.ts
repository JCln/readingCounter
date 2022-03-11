import { NgModule } from '@angular/core';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { MapDgComponent } from './all/map-dg/map-dg.component';
import { ListManagerRoutingModule } from './list-manager-routing.module';


@NgModule({
  declarations: [
    MapDgComponent
  ],
  imports: [
    SharedTwoModule,
    ListManagerRoutingModule
  ]
})
export class ListManagerModule { }
