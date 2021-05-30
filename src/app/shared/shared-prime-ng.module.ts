import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';

import { ImageViewerComponent } from '../frame-work/manage/tracking/wuoi/image-viewer/image-viewer.component';
import { AddRowDirective } from './../directives/add-row.directive';

@NgModule({
  declarations: [AddRowDirective, ImageViewerComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MatCheckboxModule,
    MultiSelectModule,
    DropdownModule,
    SliderModule,
    DynamicDialogModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    TableModule,
    MatCheckboxModule,
    MultiSelectModule,
    DropdownModule,
    SliderModule,
    DynamicDialogModule,
    AddRowDirective,
    ReactiveFormsModule,
  ],
  entryComponents: [
    ImageViewerComponent
  ],
  providers: [DialogService]
})
export class SharedPrimeNgModule {
  static forRoot(): ModuleWithProviders<SharedPrimeNgModule> {
    // Forcing the whole app to use the returned providers from the AppModule only.
    return {
      ngModule: SharedPrimeNgModule,
      providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
    };
  }
}
