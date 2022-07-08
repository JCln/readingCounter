import { NgModule } from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedTwoModule,
    SelectButtonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
