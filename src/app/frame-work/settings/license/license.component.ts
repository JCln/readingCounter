import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent extends FactoryONE {
  constructor(
    private profileService: ProfileService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (!this.closeTabService.license)
      this.closeTabService.license = await this.profileService.getMyInfoDataSource(ENInterfaces.settingsLicense);
  }
  ngOnInit(): void {
    this.classWrapper();
  }

}
