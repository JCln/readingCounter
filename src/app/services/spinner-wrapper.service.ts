import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SpinnerWrapperService {

  private loadingStatus = new BehaviorSubject<object>({ isNetwork: false, value: false, shouldShow: false });
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
    this.loading({ isNetwork: true, value: true, shouldShow: true });
  }
  stopPending() {
    this.loading({ isNetwork: true, value: false, shouldShow: true });
  }
  startLoading() {
    this.loading({ isNetwork: false, value: true, shouldShow: true });
  }
  stopLoading() {
    this.loading({ isNetwork: false, value: false, shouldShow: true });
  }
  stopAll() {
    this.loading({ isNetwork: false, value: false, shouldShow: false });
  }
  startLoadingSmallSpinner() {
    this.loadingSmallSpinner(true);
  }
  stopLoadingSmallSpinner() {
    this.loadingSmallSpinner(false);
  }

}
