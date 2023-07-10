import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [],
    imports: [
        FormsModule,
        CommonModule
    ],
    exports: [
        CommonModule, FormsModule
    ]
})
export class SharedTwoModule {
    static forRoot(): ModuleWithProviders<SharedTwoModule> {
        // Forcing the whole app to use the returned providers from the AppModule only.
        return {
            ngModule: SharedTwoModule,
            providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
        };
    }
}
