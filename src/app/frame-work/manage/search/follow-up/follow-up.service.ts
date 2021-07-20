import { Injectable } from '@angular/core';
import { IFollowUp } from 'interfaces/imanage';

@Injectable()
export class FollowUpService {
    serviceData: IFollowUp;

    setData(value: IFollowUp) {
        this.serviceData = value;
    }
    getData(): IFollowUp {
        return this.serviceData;
    }
}