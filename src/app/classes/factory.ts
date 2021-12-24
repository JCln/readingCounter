import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    template: ''
})
export abstract class FactoryONE implements OnInit, OnDestroy {
    subscription: Subscription[] = [];

    constructor() { }

    abstract classWrapper(canRefresh?: boolean): void;

    ngOnDestroy(): void {
        //  for purpose of refresh any time even without new event emiteds
        // we use subscription and not use take or takeUntil
        /** UPDATE: 
         * TODO: REMOVE subscription because another perfect way
         * implemented on lastest merge
         */
        this.subscription.forEach(subscription => subscription.unsubscribe());
    }
    ngOnInit(): void {
        this.classWrapper();
    }
    refreshTable = () => {
        this.classWrapper(true);
    }
}
export class Factory {
    // constructor(type: ENFactory) { //, closeTabServiceName: string
    //     if (type == "firstType") {
    //         let temp: any;
    //         for (var member in FactoryONE)
    //             temp += member;

    //         console.log(temp);
    //         return temp;
    //     }
    // }
}
export class FactorySharedPrime { }