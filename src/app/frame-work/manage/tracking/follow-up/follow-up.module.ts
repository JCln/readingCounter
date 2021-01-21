import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { DescComponent } from './desc/desc.component';
import { FollowUpRoutingModule } from './follow-up-routing.module';
import { FollowUpComponent } from './follow-up.component';


@NgModule({
  declarations: [FollowUpComponent, DescComponent],
  imports: [
    SharedPrimeNgModule,
    ReactiveFormsModule,
    FollowUpRoutingModule
  ]
})
export class FollowUpModule { }
