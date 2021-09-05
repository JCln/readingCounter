import { Component } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { IBrowserNotif } from 'interfaces/ioverall-config';
import { BrowserSupportService } from 'services/browser-support.service';

@Component({
  selector: 'app-annouce-notif',
  templateUrl: './annouce-notif.component.html',
  styleUrls: ['./annouce-notif.component.scss']
})
export class AnnouceNotifComponent {
  notifConfig: IBrowserNotif[] = [
    {
      isClosable: false,
      message: EN_messages.browserSupport_alarm,
      backgroundColor: 'var(--red_600)',
      isShow: true
    },
    {
      isClosable: true,
      message: EN_messages.browserSupport_warn,
      backgroundColor: 'var(--orange_600)',
      isShow: true
    },
    {
      isClosable: false,
      message: EN_messages.browserSupport_alarm,
      backgroundColor: 'var(--red_600)',
      isShow: false
    },
  ]
  constructor(
    private browserSupportService: BrowserSupportService
  ) { }

  showNotif = (): IBrowserNotif => {
    let temp;
    if (this.browserSupportService.isTouchScreen())
      temp = this.browserSupportService.statusTouchBrowser();
    else
      temp = this.browserSupportService.statusDesktopBrowser();

    if (temp == 200)
      return this.notifConfig[2];

    if (temp == 400)
      return this.notifConfig[1];

    return this.notifConfig[0];
  }
}
