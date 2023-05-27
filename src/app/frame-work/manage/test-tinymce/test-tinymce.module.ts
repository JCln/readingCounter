import { TestTinymceComponent } from './test-tinymce.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestTinymceRoutingModule } from './test-tinymce-routing.module';


@NgModule({
  declarations: [
    TestTinymceComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    TestTinymceRoutingModule
  ]
})
export class TestTinymceModule { }
