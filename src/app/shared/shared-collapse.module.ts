import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { CollapsableComponent } from './collapsable/collapsable.component';


@NgModule({
    declarations: [
        CollapsableComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CommonModule,
        CollapsableComponent
    ]
})
export class SharedCollapseModule {
    static forRoot(): ModuleWithProviders<SharedCollapseModule> {
        // Forcing the whole app to use the returned providers from the AppModule only.
        return {
            ngModule: SharedCollapseModule,
            providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
        };
    }
}
