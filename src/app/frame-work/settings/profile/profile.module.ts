import { NgModule } from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedChangePassModule } from 'src/app/shared/shared-change-pass.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedTwoModule,
    SelectButtonModule,
    SharedChangePassModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
