import { Component, OnInit } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { InteractionService } from 'services/interaction.service';
import { ProfileService } from 'services/profile.service';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  notification: boolean = false;
  networkReq: boolean = false;
  _hasSpinner: boolean = false;
  interval: any;
  expire_seconds: number = 0;
  private readonly static_second: number = 7;
  private readonly delayTime: number = 1000;

  constructor(
    private utilsService: UtilsService,
    private spinnerWrapper: SpinnerWrapperService,
    private interactionService: InteractionService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.spinnerJob();
  }
  showNetworkSpinner(res: any) {
    this.networkReq = res.value;
    this.notification = false;
    this.clearInterval();
  }
  showSimpleSpinner(res: any) {
    this.notification = res.value;
    this.networkReq = false;
    this.clearInterval();
    this.intervalWrapper();
  }
  showSpinner(res: any) {
    res.isNetwork ? this.showNetworkSpinner(res) : this.showSimpleSpinner(res)
  }
  removeSpinner() {
    this.clearInterval();
    this.spinnerWrapper.stopPending();
    this.spinnerWrapper.stopLoading();
    this.notification = false;
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
  public clearInterval = () => {
    clearInterval(this.interval);
  }
  intervalWrapper = () => {
    this.expire_seconds = this.static_second;
    this.interval = setInterval(async () => {
      this.expire_seconds--;
      if (this.expire_seconds > 1) {
        if (this.expire_seconds <= this.static_second / 2) {
          const url = this.utilsService.compositeService.getRouterUrl();
          this.interactionService.setRefresh(url);
          console.log('after time devide 2');
        }
        if (this.expire_seconds <= this.static_second / 4) {
          console.log('after time devide 4');
          this.removeSpinner();
          const config = {
            messageTitle: EN_messages.networkError,
            text: EN_messages.networkErrorAdvice,
            minWidth: '20rem',
            isInput: false,
            isDelete: false,
            icon: 'pi pi-wifi',
          }
          await this.utilsService.firstConfirmDialog(config);
        };
      }
      else {
        this.clearInterval();
      }
      console.log(this.expire_seconds);
    }, this.delayTime);
  }
}
