import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';

import { ImageViewerComponent } from '../frame-work/manage/tracking/wuoi/image-viewer/image-viewer.component';
import { AddRowDirective } from './../directives/add-row.directive';
import { PrimeTableEditableComponent } from './prime-table-editable/prime-table-editable.component';
import { PrimeTableComponent } from './prime-table/prime-table.component';

@NgModule({
  declarations: [AddRowDirective, ImageViewerComponent, PrimeTableComponent, PrimeTableEditableComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MatCheckboxModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule,
    SliderModule,
    DynamicDialogModule,
    RadioButtonModule,
  ],
  exports: [
    PrimeTableComponent,
    PrimeTableEditableComponent,
    CommonModule,
    FormsModule,
    TableModule,
    MatCheckboxModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule,
    SliderModule,
    DynamicDialogModule,
    AddRowDirective,
    ReactiveFormsModule,
    RadioButtonModule,
  ],
  entryComponents: [
    ImageViewerComponent,
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
