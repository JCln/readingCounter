import { Component } from '@angular/core';
import { NavigationError, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { EN_messages } from 'interfaces/enums.enum';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { FontService } from 'services/font.service';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';
import { ThemeService } from 'services/theme.service';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    public themeService: ThemeService,
    private spinnerWrapperService: SpinnerWrapperService,
    private fontService: FontService,
    private utilsService: UtilsService
  ) {
    this.spinnerRouterChangeEvent();
    this.defaultConfigs();
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
  spinnerRouterChangeEvent = () => {
    this.router.events.subscribe(event => {
      this.createOnline$().subscribe(isOnline => {
        if (isOnline) {
          if (event instanceof RouteConfigLoadStart) {
            this.spinnerWrapperService.startLoadingSmallSpinner();
          } else if (event instanceof RouteConfigLoadEnd) {
            this.spinnerWrapperService.stopLoadingSmallSpinner();
          }
          if (event instanceof NavigationError) {
            const config = {
              messageTitle: EN_messages.networkError,
              text: EN_messages.networkErrorAdvice,
              minWidth: '20rem',
              isInput: false,
              isDelete: false,
              icon: 'pi pi-wifi',
            }
            this.utilsService.firstConfirmDialog(config);
            return;
            // console.log(event.url);

            // this.router.navigate([event.url]);
            // Display an error message or perform other tasks
          }
        }
        else {
          const config = {
            messageTitle: EN_messages.networkError,
            text: EN_messages.networkErrorAdvice,
            minWidth: '20rem',
            isInput: false,
            isDelete: false,
            icon: 'pi pi-wifi',
          }
          this.utilsService.firstConfirmDialog(config);
          return;
        }
      });
    });
  }
  defaultConfigs = () => {
    this.fontService.getActiveFont();
    this.fontService.getActiveFontFamily();
  }

}
