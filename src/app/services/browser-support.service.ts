import { Injectable } from '@angular/core';
import { ENBrowserInfo, ENBrowserStatus } from 'interfaces/ioverall-config';
import { EnvService } from 'services/env.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserSupportService {
  private browserNameAndVersion: string = '';
  private browserVersion: number = 0;

  constructor(
    private envService: EnvService
  ) {
    this.browserNameAndVersion = this.getBrowserDetails();
    this.browserVersion = parseInt(this.browserNameAndVersion.replace(/^\D+/g, ''));
  }
  isTouchScreen = (): boolean => {
    let hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
    } else {
      var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
      } else if ('orientation' in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen = (
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
      }
    }
    return hasTouchScreen;
  }
  private getBrowserDetails = (): string => {
    var ua = navigator.userAgent, tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    this.isTouchScreen();

    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  }
  isValidBrowserVersion = (): boolean => {
    if (this.isTouchScreen()) {
      if (this.statusTouchBrowser() == ENBrowserStatus.good || this.statusTouchBrowser() == ENBrowserStatus.warn)
        return true;
    }
    else {
      if (this.statusDesktopBrowser() == ENBrowserStatus.good || this.statusDesktopBrowser() == ENBrowserStatus.warn)
        return true;
    }
    return false;
  }
  getBrowserVersion = (): number => { return this.browserVersion };
  getBrowserName = (): string => {
    if (this.browserNameAndVersion.includes('Chrome'))
      return ENBrowserInfo.Chrome.title;
    if (this.browserNameAndVersion.includes('Firefox'))
      return ENBrowserInfo.FireFox.title;
    if (this.browserNameAndVersion.includes('IE'))
      return ENBrowserInfo.IE.title;
    if (this.browserNameAndVersion.includes('Opera'))
      return ENBrowserInfo.Opera.title;
    if (this.browserNameAndVersion.includes('Safari'))
      return ENBrowserInfo.Safari.title;
  }
  getBrowserInfo = (): object => {
    if (this.browserNameAndVersion.includes('Chrome'))
      return ENBrowserInfo.Chrome;
    if (this.browserNameAndVersion.includes('Firefox'))
      return ENBrowserInfo.FireFox;
    if (this.browserNameAndVersion.includes('IE'))
      return ENBrowserInfo.IE;
    if (this.browserNameAndVersion.includes('Opera'))
      return ENBrowserInfo.Opera;
    if (this.browserNameAndVersion.includes('Safari'))
      return ENBrowserInfo.Safari;
  }
  statusDesktopBrowser = (): ENBrowserStatus => {
    const temp = this.getBrowserName();
    if (temp === ENBrowserInfo.Chrome.title) {
      if (this.browserVersion > this.envService.browserVersions.Desktop.Chrome.normal)
        return ENBrowserStatus.good;
      if (this.browserVersion > this.envService.browserVersions.Desktop.Chrome.alert && this.browserVersion <= this.envService.browserVersions.Desktop.Chrome.normal)
        return ENBrowserStatus.warn;
      return ENBrowserStatus.alarm;
    }
    if (temp === ENBrowserInfo.FireFox.title) {
      if (this.browserVersion > this.envService.browserVersions.Desktop.Firefox.normal)
        return ENBrowserStatus.good;
      if (this.browserVersion > this.envService.browserVersions.Desktop.Firefox.alert && this.browserVersion <= this.envService.browserVersions.Desktop.Firefox.normal)
        return ENBrowserStatus.warn;
      return ENBrowserStatus.alarm;
    }
    if (temp === ENBrowserInfo.IE.title) {
      return ENBrowserStatus.alarm;
    }
  }
  statusTouchBrowser = (): ENBrowserStatus => {
    const temp = this.getBrowserName();
    if (temp === ENBrowserInfo.Chrome.title) {
      if (this.browserVersion > this.envService.browserVersions.Touch.Chrome.normal)
        return ENBrowserStatus.good;
      if (this.browserVersion > this.envService.browserVersions.Touch.Chrome.alert && this.browserVersion <= this.envService.browserVersions.Touch.Chrome.normal)
        return ENBrowserStatus.warn;
      return ENBrowserStatus.alarm;
    }
    if (temp === ENBrowserInfo.FireFox.title) {
      if (this.browserVersion > this.envService.browserVersions.Touch.Firefox.normal)
        return ENBrowserStatus.good;
      if (this.browserVersion > this.envService.browserVersions.Touch.Firefox.alert && this.browserVersion <= this.envService.browserVersions.Touch.Firefox.normal)
        return ENBrowserStatus.warn;
      return ENBrowserStatus.alarm;
    }
    if (temp === ENBrowserInfo.Opera.title) {
      if (this.browserVersion > this.envService.browserVersions.Touch.opera.normal)
        return ENBrowserStatus.good;
      if (this.browserVersion > this.envService.browserVersions.Touch.opera.alert && this.browserVersion <= this.envService.browserVersions.Touch.opera.normal)
        return ENBrowserStatus.warn;
      return ENBrowserStatus.alarm;
    }
    if (temp === ENBrowserInfo.Safari.title) {
      if (this.browserVersion > this.envService.browserVersions.Touch.safari.normal)
        return ENBrowserStatus.good;
      if (this.browserVersion > this.envService.browserVersions.Touch.safari.alert && this.browserVersion <= this.envService.browserVersions.Touch.safari.normal)
        return ENBrowserStatus.warn;
      return ENBrowserStatus.alarm;
    }
    if (temp === ENBrowserInfo.IE.title) {
      return ENBrowserStatus.alarm;
    }
  }

}
