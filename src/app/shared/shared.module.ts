import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { getPersianPaginatorIntl } from './getPersianPaginatorIntl';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule, FormsModule, MaterialModule, ReactiveFormsModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPersianPaginatorIntl() }
  ]

})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    // Forcing the whole app to use the returned providers from the AppModule only.
    return {
      ngModule: SharedModule,
      providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
    };
  }
}
