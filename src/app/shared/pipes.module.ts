import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SortPipe } from 'src/app/pipes/sort.pipe';

@NgModule({
  declarations: [SortPipe],
  imports: [
    CommonModule
  ],
  exports: [
    SortPipe
  ]
})
export class PipesModule {
  static forRoot(): ModuleWithProviders<PipesModule> {
    // Forcing the whole app to use the returned providers from the AppModule only.
    return {
      ngModule: PipesModule,
      providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
    };
  }
}
