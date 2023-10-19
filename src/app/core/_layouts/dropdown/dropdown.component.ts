import { Component, EventEmitter, Output } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_Routes } from 'interfaces/routes.enum';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Output() isLogout = new EventEmitter<boolean>();
  routeToProfile = EN_Routes.wrprofile;
  routeToLicense = EN_Routes.wrLicense;
  routeToAboutUs = EN_Routes.aboutUs;
  aboutUsImage = 'assets/imgs/header/logo_Atlas.png';

  constructor(
    private utilsService: UtilsService
  ) { }

  logout = () => {
    this.isLogout.emit(true);
  }
  linkToChat = () => {
    window.open(this.utilsService.getAPIUrl() + '/' + ENInterfaces.chat + this.utilsService.compositeService.getAccessToken(), ENInterfaces._blank);
  }

}
