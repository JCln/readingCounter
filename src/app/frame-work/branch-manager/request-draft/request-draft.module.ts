import { NgModule } from '@angular/core';

import { RequestDraftRoutingModule } from './request-draft-routing.module';
import { RequestDraftComponent } from './request-draft.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { LocationComponent } from './location/location.component';
import { OtherInfoComponent } from './other-info/other-info.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { TechnicalComponent } from './technical/technical.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { OfferingGroupComponent } from './offering-group/offering-group.component';
import { RequestDraftFullViewComponent } from './request-draft-full-view/request-draft-full-view.component';
import { CalculationComponent } from './calculation/calculation.component';
import { ValidationComponent } from './validation/validation.component';
import { ConfirmDgComponent } from './confirmation/confirm-dg/confirm-dg.component';


@NgModule({
  declarations: [
    RequestDraftComponent,
    ConfirmationComponent,
    LocationComponent,
    OtherInfoComponent,
    PersonalInfoComponent,
    TechnicalComponent,
    OfferingGroupComponent,
    RequestDraftFullViewComponent,
    CalculationComponent,
    ValidationComponent,
    ConfirmDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    RequestDraftRoutingModule
  ]
})
export class RequestDraftModule { }
