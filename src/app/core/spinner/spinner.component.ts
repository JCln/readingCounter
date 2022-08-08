import { Component, OnInit } from '@angular/core';
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

  constructor(private spinnerWrapper: SpinnerWrapperService, private authService: AuthService) { }

  ngOnInit(): void {
    this.spinnerWrapper.loadingStatus$.subscribe((res: any) => {
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
    console.log('To cancel me');
    this.authService.setStopReq(true);
    this.notification = false;
    this.networkReq = false;
  }
}
