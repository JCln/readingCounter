import { SharedTwoModule } from 'src/app/shared/shared-two.module';
import { TestTinymceComponent } from './test-tinymce.component';
// import { EditorModule } from '@tinymce/tinymce-angular';
import { NgModule } from '@angular/core';

import { TestTinymceRoutingModule } from './test-tinymce-routing.module';


@NgModule({
  declarations: [
    TestTinymceComponent
  ],
  imports: [
    SharedTwoModule,
    // EditorModule,
    TestTinymceRoutingModule
  ]
})
export class TestTinymceModule { }
