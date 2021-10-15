import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: 'lazy-imgs' })
export class LazyImgDirective {
    constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
        const supports = 'loading' in HTMLImageElement.prototype;

        if (supports) {
            nativeElement.setAttribute('loading', 'lazy');
        }
    }
}