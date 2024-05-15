import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientManagerAddComponent } from './client-manager-add.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { LocationComponent } from './location/location.component';
import { DescriptionComponent } from './description/description.component';
import { OtherInfoComponent } from './other-info/other-info.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  {
    path: '', component: ClientManagerAddComponent, children: [
      { path: '', redirectTo: 'personal', pathMatch: 'full' },
      { path: 'personal', component: PersonalInfoComponent },
      { path: 'others', component: OtherInfoComponent },
      { path: 'desc', component: DescriptionComponent },
      { path: 'location', component: LocationComponent },
      { path: 'confirmation', component: ConfirmationComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientManagerAddRoutingModule { }
