import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddContactRoutingModule } from './add-contact-routing.module';
import { AddContactComponent } from './add-contact.component';
import { UserInputsComponent } from './user-inputs/user-inputs.component';


@NgModule({
  declarations: [AddContactComponent, UserInputsComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AddContactRoutingModule
  ]
})
export class AddContactModule { }
