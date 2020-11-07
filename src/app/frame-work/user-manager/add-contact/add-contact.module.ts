import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddContactRoutingModule } from './add-contact-routing.module';
import { AddContactComponent } from './add-contact.component';


@NgModule({
  declarations: [AddContactComponent],
  imports: [
    SharedModule,
    AddContactRoutingModule
  ]
})
export class AddContactModule { }
