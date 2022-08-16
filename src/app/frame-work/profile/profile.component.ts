import { Component } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { IChangePassword } from 'interfaces/inon-manage';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { ENFontStyle } from 'interfaces/istyles';
import { IProfile } from 'interfaces/iuser-manager';
import { CloseTabService } from 'services/close-tab.service';
import { FontService } from 'services/font.service';
import { imageOption, ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends FactoryONE {

  password: IChangePassword = { oldPassword: '', newPassword: '', confirmPassword: '' };
  stateOptions: any[] = [{ label: 'خیر', value: false }, { label: 'بله', value: true }];
  stateOptionsSearchType: any[] = [{ label: 'تاریخ', value: false }, { label: 'دوره', value: true }];
  stateOptionsSpinner: any[] = [{ label: 'فعال', value: true }, { label: 'غیرفعال', value: false }];
  stateFontStyleOptions: any[] = [
    { label: 'xxs', value: ENFontStyle.fontXXS },
    { label: 'xs', value: ENFontStyle.fontXS },
    { label: 'sm', value: ENFontStyle.fontSM },
    { label: 's', value: ENFontStyle.fontS }
  ];
  stateOptionsImageOption: any[] = [
    {
      label: 'تمام صفحه',
      value: {
        width: '100%',
        height: '100%',
        objectFit: ''
      }
    },
    {
      label: 'کاور',
      value: {
        width: '40rem',
        height: '40rem',
        objectFit: 'cover'
      }
    },
    {
      label: 'استرچ',
      value: {
        width: '40rem',
        height: '40rem',
        objectFit: 'fill'
      }
    },
    {
      label: 'حفظ ابعاد',
      value: {
        width: '40rem',
        height: '40rem',
        objectFit: 'contain'
      }
    },
    {
      label: 'اندازه چارچوب',
      value: {
        width: '40rem',
        height: '40rem',
        objectFit: 'none'
      }
    },
  ];
  myInfoDataSource: IProfile;
  _selectCols: IObjectIteratation[];

  constructor(
    public profileService: ProfileService,
    private closeTabService: CloseTabService,
    public fontService: FontService
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

    this.getBasedOnDate();
    this.getFontStyle();
    this.getSelectedColumns();
    this.getHasCanclableSpinner();
    this.getValueOfShowCarouselMedia();
  }
  changePassword = () => {
    this.profileService.changePassword(this.password);
  }
  getSelectedColumns = () => {
    this._selectCols = this.profileService.columnSelectedProfile();
  }
  getValuesOfImg = () => {
    this.profileService.showStateVals.imgOptions = this.profileService.getImg();
  }
  setValuesOfImg = (val: imageOption) => {
    console.log(val);

    this.profileService.setImg(val);
    this.profileService.showMessage(EN_messages.imageOptionChanged);
  }
  getValueOfShowCarouselMedia = () => {
    this.profileService.showStateVals.groupImgs = this.profileService.getUseCarouselMedia();
  }
  setValueOfShowCarouselMedia = (val) => {
    this.profileService.setUseCarouselMedia(val);
    val ? this.profileService.showMessage(EN_messages.carouselShowEnabled) : this.profileService.showMessage(EN_messages.carouselShowDisabled);
  }
  getBasedOnDate = () => {
    this.profileService.showStateVals.searchBasedOnDate = this.profileService.getLocalValue();
  }
  getHasCanclableSpinner = () => {
    this.profileService.showStateVals.hasCanclableSpinner = this.profileService.getHasCanclableSpinner();
  }
  getFontStyle = () => {
    this.profileService.showStateVals.defaultFontStyle = this.profileService.getFontStyle();
  }
  setBasedOnDate = (val: any) => {
    this.profileService.setLocalValue(val);
    val ? this.profileService.showMessage(EN_messages.basedOnDateShowDisabled) : this.profileService.showMessage(EN_messages.basedOnDateShowEnabled);
  }
  setCanclableSpinner = (val: any) => {
    this.profileService.setCanclableSpinner(val);
    val ? this.profileService.showMessage(EN_messages.spinnerHasActive) : this.profileService.showMessage(EN_messages.spinnerHasCancelable);
  }
  setFontStyle = (val: ENFontStyle) => {
    this.profileService.setFontStyle(val);
    console.log(val);
    this.fontService.setFontStyle(val);
  }

}
