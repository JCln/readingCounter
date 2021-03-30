import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { DetailsResComponent } from './details-res/details-res.component';


@NgModule({
  declarations: [DetailsComponent, DetailsResComponent],
  imports: [
    SharedModule,
    SharedThreeModule,
    DetailsRoutingModule
  ]
})
export class DetailsModule { }
