import { ModuleWithProviders, NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [],
  imports: [
    ChartsModule
  ],
  exports: [
    ChartsModule
  ]
})
export class SharedChartsModule {
  static forRoot(): ModuleWithProviders<SharedChartsModule> {
    // Forcing the whole app to use the returned providers from the AppModule only.
    return {
      ngModule: SharedChartsModule,
      providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
    };
  }
}
