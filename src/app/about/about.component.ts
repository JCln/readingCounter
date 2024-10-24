import { Component } from '@angular/core';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {  
  aboutUs: { email: string, tel: string, address: string, coName: string };

  constructor(
    public utilsService: UtilsService
  ) {
    this.aboutUs = this.utilsService.envService.aboutUs;
  }

}
