import { Component, ViewChild } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { IImportDynamicDefault } from 'interfaces/import-data';
import { ENLocalStorageNames, IDictionaryManager, ISearchInOrderTo, ITrueFalse } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { InteractionService } from 'services/interaction.service';
import { LocalClientConfigsService } from 'services/local-client-configs.service';
import { FactoryONE } from 'src/app/classes/factory';
import { DateJalaliComponent } from 'src/app/core/_layouts/header/date-jalali/date-jalali.component';


@Component({
  selector: 'app-import-dynamic',
  templateUrl: './import-dynamic.component.html',
  styleUrls: ['./import-dynamic.component.scss']
})
export class ImportDynamicComponent extends FactoryONE {
  @ViewChild(DateJalaliComponent) date;

  _canShowAddButton: boolean = true;
  importDynamic: IImportDynamicDefault = {
    fromEshterak: '',
    toEshterak: '',
    zoneId: 0,
    alalHesabPercent: 0,
    imagePercent: 0,
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
    fromDate: null,
    toDate: null,
    counterReaderId: '',
    readingPeriodId: null
  }
  isTrueF: ITrueFalse[] = [
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
  ]

  searchInOrderTo: ISearchInOrderTo[] = [
    {
      title: 'تاریخ',
      isSelected: true
    },
    {
      title: 'دوره',
      isSelected: false
    }
  ]
  _isOrderByDate: boolean = true;
  _showAlalHesabPercent: boolean = false;
  _showimagePercent: boolean = false;
  canShowEditButton: boolean = false;
  _showDynamicCount: boolean;

  kindId: number = 0;
  readingPeriodKindsDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  readingConfigDefault: string[] = [];
  userCounterReader: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public interactionService: InteractionService,
    public importDynamicService: ImportDynamicService,
    private closeTabService: CloseTabService,
    private localClientConfigsService: LocalClientConfigsService
  ) {
    super(interactionService);
  }

  connectToServer = async () => {
    const validation = this.importDynamicService.checkVertification(this.importDynamic, this._isOrderByDate);
    if (!validation)
      return;
    if (this._showDynamicCount) {
      if (await this.importDynamicService.showResDialog(await this.importDynamicService.postImportDynamicCount(this.importDynamic), true, EN_messages.confirm_createList)) {
        this.importDynamicService.showResDialog(await this.importDynamicService.postImportDynamicData(this.importDynamic), false, EN_messages.importDynamic_created)
        return;
      }
    }
    this.importDynamicService.showResDialog(await this.importDynamicService.postImportDynamicData(this.importDynamic), false, EN_messages.importDynamic_created)
    this.resetToDefaultFormStatus();
    this._canShowAddButton = false;
  }
  private insertReadingConfigDefaults = (rcd: any) => {
    this.importDynamic.hasPreNumber = rcd.hasPreNumber;
    this.importDynamic.displayBillId = rcd.displayBillId;
    this.importDynamic.displayRadif = rcd.displayRadif;
    this.importDynamic.imagePercent = rcd.defaultImagePercent;
    this.importDynamic.alalHesabPercent = rcd.defaultAlalHesab;
    this._showimagePercent = true;
    this._showAlalHesabPercent = true;
  }
  private showEditButton = () => {
    if (!this.readingConfigDefault)
      return;
    this.canShowEditButton = true;
  }
  verificationACounterReaderId = async () => {
    if (this.importDynamic.zoneId || this.zoneDictionary) {
      this.verificationReadingPeriod();
      this.readingConfigDefault = await this.importDynamicService.getReadingConfigDefaults(this.importDynamic.zoneId);
    }
    if (!this.importDynamic.zoneId || !this.zoneDictionary)
      return;
    if (!this.importDynamicService.validationReadingConfigDefault(this.readingConfigDefault)) {
      this.readingConfigDefault = [];
      return;
    }
    this.userCounterReader = await this.importDynamicService.getUserCounterReaders(this.importDynamic.zoneId);
    if (!this.importDynamicService.validationInvalid(this.userCounterReader)) {
      this.userCounterReader = [];
      return;
    }
    this.insertReadingConfigDefaults(this.readingConfigDefault);
    this.showEditButton();
  }
  verificationReadingPeriod = async () => {
    if (this._isOrderByDate)
      return;
    if (!this.importDynamic.zoneId || !this.zoneDictionary || !this.kindId) {
      this.readingPeriodDictionary = [];
      return;
    }
    this.readingPeriodDictionary = await this.importDynamicService.getReadingPeriod(this.importDynamic.zoneId, this.kindId);
    this.importDynamicService.validationReadingPeriod(this.readingPeriodDictionary);

  }
  nullSavedSource = () => this.closeTabService.saveDataForImportDynamic = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.resetToDefaultFormStatus();
      this.nullSavedSource();
    }
    this.readingPeriodKindsDictionary = await this.importDynamicService.getReadingPeriodsKindDictionary();
    if (!this.importDynamicService.validationPeriodKind(this.readingPeriodKindsDictionary))
      this.readingPeriodKindsDictionary = [];
    this.zoneDictionary = await this.importDynamicService.getZoneDictionary();
    if (!this.importDynamicService.validationZoneDictionary(this.zoneDictionary))
      this.zoneDictionary = [];
    this._showDynamicCount = this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.hasDynamicCount);
  }
  private resetToDefaultFormStatus = () => {
    this._showAlalHesabPercent = false;
    this._showimagePercent = false;
    this.canShowEditButton = false;

    this.kindId = 0;
    this.readingPeriodDictionary = [];
    this.readingConfigDefault = [];
    this.userCounterReader = [];

    this.importDynamic = {
      fromEshterak: '',
      toEshterak: '',
      zoneId: 0,
      alalHesabPercent: 0,
      imagePercent: 0,
      hasPreNumber: false,
      displayBillId: false,
      displayRadif: false,
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
