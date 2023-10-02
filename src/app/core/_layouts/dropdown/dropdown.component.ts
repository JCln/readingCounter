import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_Routes } from 'interfaces/routes.enum';
import { AjaxReqWrapperService } from 'services/ajax-req-wrapper.service';
import { EnvService } from 'services/env.service';
import { JwtService } from 'src/app/auth/jwt.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Output() isLogout = new EventEmitter<boolean>();
  routeToProfile = EN_Routes.wrprofile;
  routeToLicense = EN_Routes.wrLicense;
  routeToAboutUs = EN_Routes.aboutUs;
  routeToMyMessages = EN_Routes.NotificationMessages;
  aboutUsImage = 'assets/imgs/header/logo_Atlas.png';
  badgeNumber: number = 0;

  constructor(
    private envService: EnvService,
    private jwtService: JwtService,
    public ajaxReqWrapperService: AjaxReqWrapperService
  ) { }

  logout = () => {
    this.isLogout.emit(true);
  }
  linkToChat = () => {
    window.open(this.envService.API_URL + '/' + ENInterfaces.chat + this.jwtService.getAccessToken(), '_blank');
  }
  getNotificationBadge = async (): Promise<number> => {
    const res = await this.ajaxReqWrapperService.getDataSource(ENInterfaces.NotifyManagerUnreadCount);
    return res.count;
  }
  getNotification = async () => {
    this.badgeNumber = await this.getNotificationBadge();
  }
  ngOnInit(): void {
    this.getNotification();
  }

}
