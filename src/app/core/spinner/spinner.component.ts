import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'services/profile.service';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  notification: boolean = false;
  networkReq: boolean = false;
  _hasSpinner: boolean = false;

  constructor(
    private spinnerWrapper: SpinnerWrapperService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.spinnerJob();
  }
  spinnerJob = () => {
    this.spinnerWrapper.loadingStatus$.subscribe((res: any) => {
      this._hasSpinner = this.profileService.getHasCanclableSpinner() ? true : false;

      if (res.isNetwork) {
        this.networkReq = res.value;
        this.notification = false;
      }
      else {
        this.notification = res.value;
        this.networkReq = false;
      }
    }
    )
  }
  cancelMe = () => {
    this.spinnerWrapper.stopPending();
    this.notification = false;
    this.networkReq = false;
  }
}
