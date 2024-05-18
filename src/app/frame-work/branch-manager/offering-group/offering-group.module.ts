import { NgModule } from '@angular/core';
import { OfferingGroupRoutingModule } from './offering-group-routing.module';
import { OfferingGroupComponent } from './offering-group.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { OfferingGroupDgComponent } from './offering-group-dg/offering-group-dg.component';


@NgModule({
  declarations: [
    OfferingGroupComponent,
    OfferingGroupDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    OfferingGroupRoutingModule
  ]
})
export class OfferingGroupModule { }
