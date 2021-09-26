import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { InteractionService } from 'services/interaction.service';

@Component({
    template: ''
})
export abstract class FactoryONE implements OnInit, AfterViewInit, OnDestroy {
    subscription: Subscription[] = [];

    constructor(
        public interactionService: InteractionService
    ) { }

    abstract classWrapper(canRefresh?: boolean): void;

    refreshTabStatus = () => {
        this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
            if (res.includes(Factory.refreshTabStatus()))
                this.classWrapper(true);
        })
        )
    }
    ngAfterViewInit(): void {
        this.refreshTabStatus();
    }
    ngOnDestroy(): void {
        //  for purpose of refresh any time even without new event emiteds
        // we use subscription and not use take or takeUntil
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
    static refreshTabStatus = () => {
        const tempRoute = window.location.pathname;
        if (tempRoute)
            return tempRoute;
        return null;
    }
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
