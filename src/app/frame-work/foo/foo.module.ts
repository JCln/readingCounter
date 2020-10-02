import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { FooRoutingModule } from './foo-routing.module';
import { FooComponent } from './foo.component';


@NgModule({
  declarations: [FooComponent],
  imports: [
    SharedModule,
    FooRoutingModule
  ]
})
export class FooModule { }
