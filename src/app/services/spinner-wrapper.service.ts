import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SpinnerWrapperService {

  private loadingStatus = new BehaviorSubject<boolean>(false);
  loadingStatus$ = this.loadingStatus.asObservable();

  private loading(loadingStatus: boolean) {
    this.loadingStatus.next(loadingStatus);
  }

  startLoading() {
    this.loading(true);
  }

  stopLoading() {
    this.loading(false);
  }

}
