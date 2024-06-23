import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestDraftComponent } from './request-draft.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { OtherInfoComponent } from './other-info/other-info.component';
import { LocationComponent } from './location/location.component';
import { TechnicalComponent } from './technical/technical.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { OfferingGroupComponent } from './offering-group/offering-group.component';
import { CalculationComponent } from './calculation/calculation.component';
import { ValidationComponent } from './validation/validation.component';

const routes: Routes = [
  {
    path: '', component: RequestDraftComponent, children: [
      { path: '', component: OfferingGroupComponent, pathMatch: 'full' },
      { path: 'offering', component: OfferingGroupComponent },
      { path: 'validation', component: ValidationComponent },
      { path: 'personal', component: PersonalInfoComponent },
      { path: 'technical', component: TechnicalComponent },
      { path: 'others', component: OtherInfoComponent },
      { path: 'location', component: LocationComponent },
      { path: 'confirmation', component: ConfirmationComponent },
      { path: 'calculation', component: CalculationComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestDraftRoutingModule { }
