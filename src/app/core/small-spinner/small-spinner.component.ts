import { Component, OnInit } from '@angular/core';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';

@Component({
  selector: 'app-small-spinner',
  templateUrl: './small-spinner.component.html',
  styleUrls: ['./small-spinner.component.scss']
})
export class SmallSpinnerComponent implements OnInit {
  notification: boolean = false;

  constructor(private spinnerWrapper: SpinnerWrapperService) { }

  ngOnInit(): void {
    this.spinnerWrapper.loadingSmallSpinnerStatus$.subscribe(res =>
      this.notification = res
    )
  }
}
