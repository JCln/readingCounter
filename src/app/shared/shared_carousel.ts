import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';

import { CarouselWoumComponent } from './carousel-woum/carousel-woum.component';
import { WoumComponent } from './carousel-woum/woum/woum.component';


@NgModule({
    declarations: [
        CarouselWoumComponent,
        WoumComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        GalleriaModule
    ],
    exports: [
        CarouselWoumComponent,
        WoumComponent,
        CommonModule,
        FormsModule,
        GalleriaModule
    ]
})
export class SharedCarouselModule {
    static forRoot(): ModuleWithProviders<SharedCarouselModule> {
        // Forcing the whole app to use the returned providers from the AppModule only.
        return {
            ngModule: SharedCarouselModule,
            providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
        };
    }
}
