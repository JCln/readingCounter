import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

import { SortAccordingToComponent } from './sort-according-to/sort-according-to.component';

@NgModule({
    declarations: [
        SortAccordingToComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RadioButtonModule,
    ],
    exports: [
        SortAccordingToComponent
    ]
})
export class SharedSortByModule {
    static forRoot(): ModuleWithProviders<SharedSortByModule> {
        // Forcing the whole app to use the returned providers from the AppModule only.
        return {
            ngModule: SharedSortByModule,
            providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
        };
    }
}
