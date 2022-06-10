import { Component } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';
import { ThemeService } from 'services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loadingRouteConfig: boolean = false;

  constructor(
    private router: Router,
    public themeService: ThemeService,
    private spinnerWrapperService: SpinnerWrapperService
  ) {

    this.router.events.subscribe(event => {
      this.createOnline$().subscribe(isOnline => {
        if (isOnline) {
          if (event instanceof RouteConfigLoadStart) {
            this.spinnerWrapperService.startLoading();
          } else if (event instanceof RouteConfigLoadEnd) {
            this.spinnerWrapperService.stopLoading();
          }
        }
      });
    });
  }

  createOnline$() {
    return merge<any>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
}
