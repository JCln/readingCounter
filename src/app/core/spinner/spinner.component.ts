import { Component, OnInit } from '@angular/core';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  notification: boolean = false;
  networkReq: boolean = false;

  constructor(private spinnerWrapper: SpinnerWrapperService) { }

  ngOnInit(): void {
    this.spinnerWrapper.loadingStatus$.subscribe((res: any) => {
      console.log(res);

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
}
