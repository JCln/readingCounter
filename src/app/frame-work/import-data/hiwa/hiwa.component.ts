import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENLocalStorageNames, EN_messages } from 'interfaces/enums.enum';
import { IReadingConfigDefault } from 'interfaces/iimports';
import { IDictionaryManager, ITrueFalse } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { LocalClientConfigsService } from 'services/local-client-configs.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { DateJalaliComponent } from 'src/app/core/_layouts/header/date-jalali/date-jalali.component';

@Component({
  selector: 'app-hiwa',
  templateUrl: './hiwa.component.html',
  styleUrls: ['./hiwa.component.scss']
})
export class HiwaComponent extends FactoryONE {
  @ViewChild(DateJalaliComponent) date;

  _canShowAddButton: boolean = true;
  isTrueF: ITrueFalse[] = [
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
  ]

  _showAlalHesabPercent: boolean = false;
  _showimagePercent: boolean = false;
  _showDynamicCount: boolean;

  kindId: number = 0;
  readingPeriodKindsDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  readingConfigDefault: IReadingConfigDefault;
  userCounterReader: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public importDynamicService: ImportDynamicService,
    public closeTabService: CloseTabService,
    private localClientConfigsService: LocalClientConfigsService
  ) {
    super();
  }

  connectToServer = async () => {
    if (!MathS.isNull(this.closeTabService.importHiwaReq.zoneId)) {

      if (!this.importDynamicService.verificationService.verificationReadingConfigDefault(this.readingConfigDefault, this.closeTabService.importHiwaReq))
        return;
      const validation = this.importDynamicService.verificationService.checkVertification(this.closeTabService.importHiwaReq, this.closeTabService._isOrderByDate);
      if (!validation)
        return;
      if (this._showDynamicCount) {
        if (await this.importDynamicService.showResDialog(await this.importDynamicService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.postImportHiwaCount, this.closeTabService.importHiwaReq), true, EN_messages.confirm_createList)) {
          this.importDynamicService.showResDialog(await this.importDynamicService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.postImportHiwa, this.closeTabService.importHiwaReq), false, EN_messages.importDynamic_created)
          return;
        }
      }
      this.importDynamicService.showResDialog(await this.importDynamicService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.postImportHiwa, this.closeTabService.importHiwaReq), false, EN_messages.importDynamic_created)
      this.resetToDefaultFormStatus();
    }
    else {
      this.importDynamicService.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
    }
  }
  private insertReadingConfigDefaults = (rcd: any) => {
    this.closeTabService.importHiwaReq.hasPreNumber = rcd.defaultHasPreNumber;
    this.closeTabService.importHiwaReq.displayBillId = rcd.displayBillId ? rcd.displayBillId : false;
    this.closeTabService.importHiwaReq.displayRadif = rcd.displayRadif ? rcd.displayRadif : false;
    this.closeTabService.importHiwaReq.imagePercent = rcd.defaultImagePercent;
    this.closeTabService.importHiwaReq.alalHesabPercent = rcd.defaultAlalHesab;
    this.closeTabService.importHiwaReq.displayPreDate = rcd.displayPreDate ? rcd.displayPreDate : false;
    this.closeTabService.importHiwaReq.displayMobile = rcd.displayMobile ? rcd.displayMobile : false;
    this.closeTabService.importHiwaReq.hasImage = rcd.hasImage ? rcd.hasImage : false;
    this.closeTabService.importHiwaReq.displayDebt = rcd.displayDebt ? rcd.displayDebt : false;
    this.closeTabService.importHiwaReq.displayIcons = rcd.displayIcons ? rcd.displayIcons : false;
    this._showimagePercent = true;
    this._showAlalHesabPercent = true;
  }
  verificationACounterReaderId = async () => {
    if (!MathS.isNull(this.closeTabService.importHiwaReq.zoneId)) {
      if (this.zoneDictionary) {
        this.verificationReadingPeriod();
        this.readingConfigDefault = await this.importDynamicService.dictionaryWrapperService.getReadingConfigDefaultByZoneIdDictionary(this.closeTabService.importHiwaReq.zoneId);
      }
      if (!this.importDynamicService.verificationService.validationInvalid(this.readingConfigDefault, EN_messages.thereis_no_default))
        return;

      this.userCounterReader = await this.importDynamicService.dictionaryWrapperService.getUserCounterReaderDictionary(this.closeTabService.importHiwaReq.zoneId);
      if (!this.importDynamicService.verificationService.validationInvalid(this.userCounterReader, EN_messages.thereis_no_reader)) {
        this.userCounterReader = [];
        return;
      }
      this.insertReadingConfigDefaults(this.readingConfigDefault);
    }
  }
  verificationReadingPeriod = async () => {
    if (this.closeTabService._isOrderByDate)
      return;
    if (!this.closeTabService.importHiwaReq.zoneId || !this.zoneDictionary || !this.kindId) {
      this.readingPeriodDictionary = [];
      return;
    }
    this.readingPeriodDictionary = await this.importDynamicService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.closeTabService.importHiwaReq.zoneId, this.kindId);
    this.importDynamicService.verificationService.validationInvalid(this.readingPeriodDictionary, EN_messages.not_found_period);

  }
  nullSavedSource = () => this.closeTabService.importHiwa = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.resetToDefaultFormStatus();
      this.nullSavedSource();
    }
    this.readingPeriodKindsDictionary = await this.importDynamicService.dictionaryWrapperService.getPeriodKindDictionary();
    if (!this.importDynamicService.verificationService.validationInvalid(this.readingPeriodKindsDictionary, EN_messages.thereis_no_type))
      this.readingPeriodKindsDictionary = [];
    this.zoneDictionary = await this.importDynamicService.dictionaryWrapperService.getZoneDictionary();
    if (!this.importDynamicService.verificationService.validationInvalid(this.zoneDictionary, EN_messages.not_found_zoneId))
      this.zoneDictionary = [];
    this.closeTabService.getSearchInOrderTo();
    this.verificationACounterReaderId();
    this._showDynamicCount = this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.hasDynamicCount, true);
  }
  private resetToDefaultFormStatus = () => {
    this._showAlalHesabPercent = false;
    this._showimagePercent = false;

    this.kindId = 0;
    this.readingPeriodDictionary = [];
    this.userCounterReader = [];

    this.closeTabService.importHiwaReq = {
      fromEshterak: '',
      toEshterak: '',
      zoneId: 0,
      alalHesabPercent: 0,
      imagePercent: 0,
      hasPreNumber: false,
      displayBillId: false,
      displayRadif: false,
      displayPreDate: false,
      displayMobile: false,
      hasImage: false,
      displayDebt: false,
      displayIcons: false,
      fromDate: this.closeTabService.utilsService.dateJalaliService.getCurrentDate(),
      toDate: this.closeTabService.utilsService.dateJalaliService.getCurrentDate(),
      counterReaderId: '',
      readingPeriodId: null
    }
  }
  setShowDynamicCount = ($event) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.hasDynamicCount, $event);
  }

}
