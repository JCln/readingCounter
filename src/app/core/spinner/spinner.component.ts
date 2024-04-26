import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'services/profile.service';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  networkReq: boolean = false;
  _hasSpinner: boolean = false;

  constructor(
    private spinnerWrapper: SpinnerWrapperService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.spinnerJob();
  }
  showNetworkSpinner(res: any) {
    this.networkReq = res.value;
  }
  showSpinner(res: any) {
    this.showNetworkSpinner(res)
  }
  removeSpinner() {
    this.spinnerWrapper.stopPending();
    this._hasSpinner = false;
    this.networkReq = false;
  }

  spinnerJob = () => {
    this.spinnerWrapper.loadingStatus$.subscribe((res: any) => {
      this._hasSpinner = this.profileService.getHasCancelableSpinner() ? true : false;
      res.shouldShow ? this.showSpinner(res) : this.removeSpinner();
    })
  }
  cancelMe = () => {
    this.removeSpinner();
  }

}
