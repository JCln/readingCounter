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
  selector: 'app-import-dynamic',
  templateUrl: './import-dynamic.component.html',
  styleUrls: ['./import-dynamic.component.scss']
})
export class ImportDynamicComponent extends FactoryONE {
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
    private closeTabService: CloseTabService,
    private localClientConfigsService: LocalClientConfigsService
  ) {
    super();
  }

  connectToServer = async () => {
    if (!MathS.isNull(this.importDynamicService.importDynamicReq.zoneId)) {

      if (!this.importDynamicService.verificationReadingConfigDefault(this.readingConfigDefault, this.importDynamicService.importDynamicReq))
        return;
      const validation = this.importDynamicService.checkVertification(this.importDynamicService.importDynamicReq, this.importDynamicService._isOrderByDate);
      if (!validation)
        return;
      if (this._showDynamicCount) {
        if (await this.importDynamicService.showResDialog(await this.importDynamicService.postImportDynamicData(ENInterfaces.postImportDynamicCount, this.importDynamicService.importDynamicReq), true, EN_messages.confirm_createList)) {
          this.importDynamicService.showResDialog(await this.importDynamicService.postImportDynamicData(ENInterfaces.postImportData, this.importDynamicService.importDynamicReq), false, EN_messages.importDynamic_created)
          return;
        }
      }
      this.importDynamicService.showResDialog(await this.importDynamicService.postImportDynamicData(ENInterfaces.postImportData, this.importDynamicService.importDynamicReq), false, EN_messages.importDynamic_created)
      this.resetToDefaultFormStatus();
    }
    else {
      this.importDynamicService.snackMessage(EN_messages.insert_zone);
    }
  }
  private insertReadingConfigDefaults = (rcd: any) => {
    this.importDynamicService.importDynamicReq.hasPreNumber = rcd.defaultHasPreNumber;
    this.importDynamicService.importDynamicReq.displayBillId = rcd.displayBillId;
    this.importDynamicService.importDynamicReq.displayRadif = rcd.displayRadif;
    this.importDynamicService.importDynamicReq.imagePercent = rcd.defaultImagePercent;
    this.importDynamicService.importDynamicReq.alalHesabPercent = rcd.defaultAlalHesab;
    this.importDynamicService.importDynamicReq.displayPreDate = rcd.displayPreDate;
    this.importDynamicService.importDynamicReq.displayMobile = rcd.displayMobile;
    this.importDynamicService.importDynamicReq.hasImage = rcd.hasImage;
    this._showimagePercent = true;
    this._showAlalHesabPercent = true;
  }
  verificationACounterReaderId = async () => {
    if (!MathS.isNull(this.importDynamicService.importDynamicReq.zoneId)) {
      if (this.zoneDictionary) {
        this.verificationReadingPeriod();
        this.readingConfigDefault = await this.importDynamicService.dictionaryWrapperService.getReadingConfigDefaultByZoneIdDictionary(this.importDynamicService.importDynamicReq.zoneId);
      }
      if (!this.importDynamicService.validationInvalid(this.readingConfigDefault, EN_messages.thereis_no_default))
        return;

      this.userCounterReader = await this.importDynamicService.dictionaryWrapperService.getUserCounterReaderDictionary(this.importDynamicService.importDynamicReq.zoneId);
      if (!this.importDynamicService.validationInvalid(this.userCounterReader, EN_messages.thereis_no_reader)) {
        this.userCounterReader = [];
        return;
      }
      this.insertReadingConfigDefaults(this.readingConfigDefault);
    }
  }
  verificationReadingPeriod = async () => {
    if (this.importDynamicService._isOrderByDate)
      return;
    if (!this.importDynamicService.importDynamicReq.zoneId || !this.zoneDictionary || !this.kindId) {
      this.readingPeriodDictionary = [];
      return;
    }
    this.readingPeriodDictionary = await this.importDynamicService.ajaxReqWrapperService.getDataSourceByQuoteTriple(ENInterfaces.readingPeriodDictionaryByZoneIdAndKindId, this.importDynamicService.importDynamicReq.zoneId, this.kindId);
    this.importDynamicService.validationInvalid(this.readingPeriodDictionary, EN_messages.not_found_period);

  }
  nullSavedSource = () => this.closeTabService.saveDataForImportDynamic = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.resetToDefaultFormStatus();
      this.nullSavedSource();
    }
    this.readingPeriodKindsDictionary = await this.importDynamicService.dictionaryWrapperService.getPeriodKindDictionary();
    if (!this.importDynamicService.validationInvalid(this.readingPeriodKindsDictionary, EN_messages.thereis_no_type))
      this.readingPeriodKindsDictionary = [];
    this.zoneDictionary = await this.importDynamicService.dictionaryWrapperService.getZoneDictionary();
    if (!this.importDynamicService.validationInvalid(this.zoneDictionary, EN_messages.not_found_zoneId))
      this.zoneDictionary = [];
    this.importDynamicService.getSearchInOrderTo();
    this.verificationACounterReaderId();
    this._showDynamicCount = this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.hasDynamicCount, true);
  }
  private resetToDefaultFormStatus = () => {
    this._showAlalHesabPercent = false;
    this._showimagePercent = false;

    this.kindId = 0;
    this.readingPeriodDictionary = [];
    this.userCounterReader = [];

    this.importDynamicService.importDynamicReq = {
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
      fromDate: null,
      toDate: null,
      counterReaderId: '',
      readingPeriodId: null
    }
  }
  setShowDynamicCount = ($event) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.hasDynamicCount, $event);
  }

}
