import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ILicenseInfo } from 'interfaces/isettings';
import { ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent extends FactoryONE {
  dataSource: ILicenseInfo;

  constructor(
    private profileService: ProfileService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    this.dataSource = await this.profileService.getMyInfoDataSource(ENInterfaces.settingsLicense);
  }
  ngOnInit(): void {
    this.classWrapper();
  }

}
