import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { IProfile } from 'interfaces/isettings';
import { ENFontFamily, ENFontFamilyExactName, ENFontStyle, ENOutputConfigColWidth } from 'interfaces/istyles';
import { CloseTabService } from 'services/close-tab.service';
import { FontService } from 'services/font.service';
import { imageOption, IOutputConfig, ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends FactoryONE {

  stateOptions: any[] = [{ label: 'تکی', value: false }, { label: 'گروهی', value: true }];
  stateOptionsSearchType: any[] = [{ label: 'تاریخ', value: false }, { label: 'دوره', value: true }];
  stateOptionsSpinner: any[] = [{ label: 'فعال', value: true }, { label: 'غیرفعال', value: false }];
  stateOptionsReordersableTable: any[] = [{ label: 'فعال', value: true }, { label: 'غیرفعال', value: false }];
  stateOptionsAggregateTracks: any[] = [{ label: 'فعال', value: true }, { label: 'غیرفعال', value: false }];
  stateOptionsOutputConfig: any[] = [{ label: 'فعال', value: true }, { label: 'غیرفعال', value: false }];
  stateOptionsOutputConfigShouldFirstFreeze: any[] = [{ label: 'بله', value: true }, { label: 'خیر', value: false }];
  stateOptionsGeneralSearch: any[] = [{ label: 'فعال', value: true }, { label: 'غیرفعال', value: false }];
  stateOptionsTwoSteps: any[] = [{ label: 'فعال', value: true }, { label: 'غیرفعال', value: false }];
  stateOptionsVirtualScroll: any[] = [{ label: 'فعال', value: true }, { label: 'غیرفعال', value: false }];
  stateFontStyleOptions: any[] = [
    { label: 'خیلی کوچک', value: ENFontStyle.fontXXS },
    { label: 'کوچک', value: ENFontStyle.fontXS },
    { label: 'متوسط', value: ENFontStyle.fontSM },
    { label: 'بزرگ', value: ENFontStyle.fontS }
  ];
  stateOuputConfigDefaultColWidth: any[] = [
    { label: '10px', value: ENOutputConfigColWidth.fontXS },
    { label: '13px', value: ENOutputConfigColWidth.fontS },
    { label: '21px', value: ENOutputConfigColWidth.fontS2 },
    { label: '28px', value: ENOutputConfigColWidth.fontM }
  ];
  stateOutputConfigFontFamilyOptions: any[] = [
    { label: 'B Lotus', value: ENFontFamilyExactName.BLotus },
    { label: 'B Koodak', value: ENFontFamilyExactName.BKoodak },
    { label: 'B Nazanin', value: ENFontFamilyExactName.BNazanin },
    { label: 'B Yekan', value: ENFontFamilyExactName.BYekan },
  ];
  stateFontFamilyOptions: any[] = [
    { label: 'B Lotus', value: ENFontFamily.BLotus },
    { label: 'B Koodak', value: ENFontFamily.BKoodak }
  ];
  notifyPositionOptions: any[] = [
    { label: 'بالا راست', value: 'top-right' },
    { label: 'بالا چپ', value: 'top-left' },
    { label: 'پایین راست', value: 'bottom-right' },
    { label: 'پایین چپ', value: 'bottom-left' },
    { label: 'بالا وسط', value: 'top-center' },
    { label: 'پایین وسط', value: 'bottom-center' },
    { label: 'مرکز', value: 'center' }
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
    {
      label: 'حداکثر اندازه',
      value: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }
    },
  ];
  private profileColumns: string = 'profile';
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
      this.myInfoDataSource = await this.profileService.ajaxReqWrapperService.getDataSource(ENInterfaces.getMyProfile);
      this.closeTabService.saveDataForProfile = this.myInfoDataSource;
    }

    this.getBasedOnDate();
    this.getFontStyle();
    this.getFontFamily();
    this.getNotifyPosition();
    this.getSelectedColumns();
    this.getHasCanclableSpinner();
    this.getValueOfShowCarouselMedia();
    this.getDefaultAggregationTrackings();
    this.getReOrderable();
    this.getTwoStepsStatus();
    this.getVirtuallScrollStatus();
    this.getValuesOfImg();
    this.getOutputConfig();
  }
  getSelectedColumns = () => {
    this._selectCols = this.profileService.columnManager.getColumnsMenus(this.profileColumns);
  }
  getValuesOfImg = () => {
    this.profileService.showStateVals.imgOptions = this.profileService.getImg();
  }
  getOutputConfig = () => {
    this.profileService.showStateVals.outputConfig = this.profileService.getOutputConfigs();
  }
  getTwoStepsStatus = () => {
    this.profileService.getTwoStepsAuth();
  }
  setValuesOfImg = (val: imageOption) => {
    this.profileService.setImg(val);
    this.profileService.showMessage(EN_messages.imageOptionChanged);
  }
  setOutputConfigShouldFilterValue = (val: IOutputConfig) => {
    this.profileService.setOutputConfigs(val);
    val.shouldFilteredValue ? this.profileService.showMessage(EN_messages.shouldFilterOutputConfigEnabled) : this.profileService.showMessage(EN_messages.shouldFilterOutputConfigDisabled)
  }
  setOutputConfigShouldFreezeHeader = (val: IOutputConfig) => {
    this.profileService.setOutputConfigs(val);
    val.shouldFreezeHeader ? this.profileService.showMessage(EN_messages.shouldFreezeHeaderEnabled) : this.profileService.showMessage(EN_messages.shouldFreezeHeaderDisabled)
  }
  setOutputConfigDefaultColWidth = (val: IOutputConfig) => {
    this.profileService.setOutputConfigs(val);
    this.profileService.showMessage(EN_messages.shouldOutputConfigDefaultColWidth);
  }
  setOutputConfigDefaultFontFamily = (val: IOutputConfig) => {
    this.profileService.setOutputConfigs(val);
    this.profileService.showMessage(EN_messages.shouldOutputConfigDefaultFontFamily);
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
  getReOrderable = () => {
    this.profileService.showStateVals.reOrderableTable = this.profileService.getLocalReOrderable();
  }
  getVirtuallScrollStatus = () => {
    this.profileService.showStateVals.virtualScrollStatus = this.profileService.getLocalVirtuallScrollStatus();
  }
  getDefaultAggregationTrackings = () => {
    this.profileService._agg.flag = this.profileService.getLocalDefaultAggregateTracks();
  }
  getTableGeneralSearch = () => {
    this.profileService._agg.hasGeneralSearch = this.profileService.getTableGeneralSearch();
  }
  getHasCanclableSpinner = () => {
    this.profileService.showStateVals.hasCanclableSpinner = this.profileService.getHasCanclableSpinner();
  }
  getFontStyle = () => {
    this.profileService.showStateVals.defaultFontStyle = this.profileService.getFontStyle();
  }
  getFontFamily = () => {
    this.profileService.showStateVals.defaultFontFamily = this.profileService.getFontFamily();
  }
  getNotifyPosition = () => {
    this.profileService.showStateVals.notifyPosition = this.profileService.getLocalNotifyPosition();
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
    this.fontService.setFontStyle(val);
  }
  setFontFamily = (val: ENFontFamily) => {
    this.profileService.setFontFamily(val);
    this.fontService.setFontFamily(val);
  }
  setVirtualScrollStatus = (val: boolean) => {
    this.profileService.setLocalVirtuallScrollStatus(val);
    val ? this.profileService.showMessage(EN_messages.virtualScrollEnabled) : this.profileService.showMessage(EN_messages.virtualScrollDisabled);
  }
  setNotifyPosition = (val: string) => {
    this.profileService.setLocalNotifyPosition(val);
    this.profileService.showMessage(EN_messages.notifyPositionChange);
  }
  setReOrderableTable = (val: any) => {
    this.profileService.setLocalReOrderable(val);
    val ? this.profileService.showMessage(EN_messages.possibleReOrderableEnabled) : this.profileService.showMessage(EN_messages.possibleReOrderableDisabled);
  }
  setTwoStepsStatus = async (val: any) => {
    await this.profileService.setTwoStepsStatus(val);
  }
  setDefaultAggregateTracks = (val: any) => {
    this.profileService.setLocaldefaultAggregateTracks(val);
    val ? this.profileService.showMessage(EN_messages.possibledefaultAggregateTracksEnabled) : this.profileService.showMessage(EN_messages.possibledefaultAggregateTracksDisabled);
  }
  setTableGeneralSearch = (val: any) => {
    this.profileService.setLocalTableGeneralSearch(val);
    val ? this.profileService.showMessage(EN_messages.tableGeneralSearchEnabled) : this.profileService.showMessage(EN_messages.tableGeneralSearchDisabled);
  }

}
