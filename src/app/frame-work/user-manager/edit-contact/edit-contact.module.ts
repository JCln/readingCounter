import { NgModule } from '@angular/core';

import { SharedModule } from './../../../shared/shared.module';
import { EditContactRoutingModule } from './edit-contact-routing.module';
import { EditContactComponent } from './edit-contact.component';


@NgModule({
  declarations: [EditContactComponent],
  imports: [
    SharedModule,
    EditContactRoutingModule
  ]
})
export class EditContactModule { }
