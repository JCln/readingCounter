import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'services/profile.service';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';
import { AuthService } from 'src/app/auth/auth.service';

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
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
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
    this.authService.setStopReq(true);
    this.notification = false;
    this.networkReq = false;
  }
}
