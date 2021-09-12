import { Injectable } from '@angular/core';
import { IFollowUp } from 'interfaces/imanage';

@Injectable()
export class FollowUpService {
    trackNumber: number;
    private serviceData: IFollowUp;

    setData(value: IFollowUp) {
        this.serviceData = value;
    }
    getData(): IFollowUp {
        return this.serviceData;
    }
}