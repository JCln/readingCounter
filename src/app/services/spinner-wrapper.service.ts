import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SpinnerWrapperService {

  private loadingStatus = new BehaviorSubject<object>({ isNetwork: false, value: false });
  loadingStatus$ = this.loadingStatus.asObservable();

  private loadingSmallSpinnerStatus = new BehaviorSubject<boolean>(false);
  loadingSmallSpinnerStatus$ = this.loadingSmallSpinnerStatus.asObservable();

  private loading(loadingStatus: object) {
    this.loadingStatus.next(loadingStatus);
  }
  private loadingSmallSpinner(loadingStatus: boolean) {
    this.loadingSmallSpinnerStatus.next(loadingStatus);
  }
  startPending() {
    this.loading({ isNetwork: true, value: true });
  }
  stopPending() {
    this.loading({ isNetwork: true, value: false });
  }
  startLoading() {
    this.loading({ isNetwork: false, value: true });
  }
  stopLoading() {
    this.loading({ isNetwork: false, value: false });
  }
  startLoadingSmallSpinner() {
    this.loadingSmallSpinner(true);
  }
  stopLoadingSmallSpinner() {
    this.loadingSmallSpinner(false);
  }

}
