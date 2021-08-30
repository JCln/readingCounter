import { Injectable } from '@angular/core';
import { ENBrowserStatus } from 'interfaces/ioverall-config';

@Injectable({
  providedIn: 'root'
})
export class BrowserSupportService {
  private browserNameAndVersion: string = '';
  private browserVersion: number = 0;

  constructor() {
    this.browserNameAndVersion = this.getBrowserDetails();
    this.browserVersion = parseInt(this.browserNameAndVersion.replace(/^\D+/g, ''));
  }

  private getBrowserDetails = (): string => {
    var ua = navigator.userAgent, tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
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
    if (this.browserStatus() == ENBrowserStatus.good || this.browserStatus() == ENBrowserStatus.warn)
      return true;
    return false;
  }
  browserStatus = (): ENBrowserStatus => {
    if (this.browserNameAndVersion.includes('Chrome')) {
      if (this.browserVersion > 86)
        return ENBrowserStatus.good;
      if (this.browserVersion > 83 && this.browserVersion <= 86)
        return ENBrowserStatus.warn;
      return ENBrowserStatus.alarm;
    }
    if (this.browserNameAndVersion.includes('Firefox')) {
      if (this.browserVersion > 83)
        return ENBrowserStatus.good;
      if (this.browserVersion > 80 && this.browserVersion <= 83)
        return ENBrowserStatus.warn;
      return ENBrowserStatus.alarm;
    }
    if (this.browserNameAndVersion.includes('IE')) {
      return ENBrowserStatus.alarm;
    }
  }
}
