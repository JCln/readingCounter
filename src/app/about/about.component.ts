import { UtilsService } from './../services/utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  logoAddress = '/assets/imgs/header/logo_Atlas.png';
  aboutUs: { email: string, tel: string, address: string, coName: string };

  constructor(
    public utilsService: UtilsService
  ) {
    this.aboutUs = this.utilsService.envService.aboutUs;
  }

  ngOnInit(): void {
  }

}
