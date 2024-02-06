import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'services/profile.service';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  // notification: boolean = false;
  networkReq: boolean = false;
  _hasSpinner: boolean = false;
  // interval: any;
  // expire_seconds: number = 0;
  // private readonly static_second: number = 9;
  // private readonly delayTime: number = 1000;

  constructor(
    // private utilsService: UtilsService,
    private spinnerWrapper: SpinnerWrapperService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.spinnerJob();
  }
  showNetworkSpinner(res: any) {
    this.networkReq = res.value;
    // this.notification = false;
  }
  showSimpleSpinner(res: any) {
    // this.notification = res.value;
    this.networkReq = false;
    // this.intervalWrapper();
  }
  showSpinner(res: any) {
    // this.clearInterval();
    this.showNetworkSpinner(res)
  }
  removeSpinner() {
    // this.clearInterval();
    this.spinnerWrapper.stopPending();
    // this.notification = false;
    this._hasSpinner = false;
    this.networkReq = false;
  }

  spinnerJob = () => {
    this.spinnerWrapper.loadingStatus$.subscribe((res: any) => {
      this._hasSpinner = this.profileService.getHasCanclableSpinner() ? true : false;
      res.shouldShow ? this.showSpinner(res) : this.removeSpinner();
    })
  }
  cancelMe = () => {
    this.removeSpinner();
  }
  // public clearInterval = () => {
  //   clearInterval(this.interval);
  // }
  // intervalWrapper = () => {
  //   this.expire_seconds = this.static_second;
  //   this.interval = setInterval(() => {
  //     this.expire_seconds--;
  //     if (this.expire_seconds > 1) {
  //       console.log(this.expire_seconds);
  //       if (this.expire_seconds <= this.static_second / 4) {
  //         console.log('in for the dialog' + this.expire_seconds);

  //         this.removeSpinner();
  //         const config = {
  //           messageTitle: EN_messages.networkError,
  //           text: EN_messages.networkErrorAdvice,
  //           minWidth: '20rem',
  //           isInput: false,
  //           isDelete: false,
  //           icon: 'pi pi-wifi',
  //         }
  //         this.utilsService.firstConfirmDialog(config);
  //         this.expire_seconds = 0;
  //         this.clearInterval();
  //         return;
  //       };
  //     }
  //     else {
  //       this.clearInterval();
  //       return;
  //     }
  //   }, this.delayTime);
  // }
}
