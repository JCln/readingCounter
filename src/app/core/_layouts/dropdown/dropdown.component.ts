import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_Routes } from 'interfaces/routes.enum';
import { EnvService } from 'services/env.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
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
  badgeNumber: number;

  constructor(
    private envService: EnvService,
    private jwtService: JwtService,
    private interfaceManagerService: InterfaceManagerService
  ) { }

  logout = () => {
    this.isLogout.emit(true);
  }
  linkToChat = () => {
    window.open(this.envService.API_URL + '/' + ENInterfaces.chat + this.jwtService.getAuthorizationToken(), '_blank');
  }
  getNotificationBadge = (): Promise<number> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.NotifyManagerUnreadCount).toPromise().then((res: any) =>
        resolve(res.count)//object response                      
      );
    });
  }
  getNotification = async () => {
    this.badgeNumber = await this.getNotificationBadge();
  }
  ngOnInit(): void {
    this.getNotification();
  }

}
