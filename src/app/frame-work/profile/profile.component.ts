import { Component } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { IChangePassword } from 'interfaces/inon-manage';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { IProfile } from 'interfaces/iuser-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends FactoryONE {

  password: IChangePassword = { oldPassword: '', newPassword: '', confirmPassword: '' };
  stateOptions: any[] = [{ label: 'خیر', value: false }, { label: 'بله', value: true }];
  showCarouselVal: boolean;
  myInfoDataSource: IProfile;
  _selectCols: IObjectIteratation[];

  constructor(
    private profileService: ProfileService,
    private closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForProfile;
    }
    if (this.closeTabService.saveDataForProfile) {
      this.myInfoDataSource = this.closeTabService.saveDataForProfile;
    }
    else {
      this.myInfoDataSource = await this.profileService.getMyInfoDataSource();
      this.closeTabService.saveDataForProfile = this.myInfoDataSource;
    }

    this.getSelectedColumns();
    this.getValueOfShowCarouselMedia();
  }
  changePassword = () => {
    this.profileService.changePassword(this.password);
  }
  getSelectedColumns = () => {
    this._selectCols = this.profileService.columnSelectedProfile();
  }
  getValueOfShowCarouselMedia = () => {
    this.showCarouselVal = this.profileService.getUseCarouselMedia();
  }
  setValueOfShowCarouselMedia = (val) => {
    this.profileService.setUseCarouselMedia(val);
    val ? this.profileService.showMessage(EN_messages.carouselShowEnabled) : this.profileService.showMessage(EN_messages.carouselShowDisabled);

  }

}
