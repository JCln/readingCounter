import { Component, ViewChild } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { IReadingConfigDefault } from 'interfaces/iimports';
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
  readingConfigDefault: IReadingConfigDefault;
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
    if (!this.importDynamicService.verificationReadingConfigDefault(this.readingConfigDefault, this.importDynamicService.importDynamicReq))
      return;
    const validation = this.importDynamicService.checkVertification(this.importDynamicService.importDynamicReq, this._isOrderByDate);
    if (!validation)
      return;
    if (this._showDynamicCount) {
      if (await this.importDynamicService.showResDialog(await this.importDynamicService.postImportDynamicCount(this.importDynamicService.importDynamicReq), true, EN_messages.confirm_createList)) {
        this.importDynamicService.showResDialog(await this.importDynamicService.postImportDynamicData(this.importDynamicService.importDynamicReq), false, EN_messages.importDynamic_created)
        return;
      }
    }
    this.importDynamicService.showResDialog(await this.importDynamicService.postImportDynamicData(this.importDynamicService.importDynamicReq), false, EN_messages.importDynamic_created)
    this.resetToDefaultFormStatus();
    this._canShowAddButton = false;
  }
  private insertReadingConfigDefaults = (rcd: any) => {
    this.importDynamicService.importDynamicReq.hasPreNumber = rcd.hasPreNumber;
    this.importDynamicService.importDynamicReq.displayBillId = rcd.displayBillId;
    this.importDynamicService.importDynamicReq.displayRadif = rcd.displayRadif;
    this.importDynamicService.importDynamicReq.imagePercent = rcd.defaultImagePercent;
    this.importDynamicService.importDynamicReq.alalHesabPercent = rcd.defaultAlalHesab;
    this._showimagePercent = true;
    this._showAlalHesabPercent = true;
  }
  private showEditButton = () => {
    if (!this.readingConfigDefault)
      return;
    this.canShowEditButton = true;
  }
  verificationACounterReaderId = async () => {
    if (this.importDynamicService.importDynamicReq.zoneId || this.zoneDictionary) {
      this.verificationReadingPeriod();
      this.readingConfigDefault = await this.importDynamicService.getReadingConfigDefaults(this.importDynamicService.importDynamicReq.zoneId);
      console.log(this.readingConfigDefault);

    }
    if (!this.importDynamicService.importDynamicReq.zoneId || !this.zoneDictionary)
      return;
    if (!this.importDynamicService.validationReadingConfigDefault(this.readingConfigDefault))
      return;

    this.userCounterReader = await this.importDynamicService.getUserCounterReaders(this.importDynamicService.importDynamicReq.zoneId);
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
    if (!this.importDynamicService.importDynamicReq.zoneId || !this.zoneDictionary || !this.kindId) {
      this.readingPeriodDictionary = [];
      return;
    }
    this.readingPeriodDictionary = await this.importDynamicService.getReadingPeriod(this.importDynamicService.importDynamicReq.zoneId, this.kindId);
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
    this.verificationACounterReaderId();
    this._showDynamicCount = this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.hasDynamicCount);
  }
  private resetToDefaultFormStatus = () => {
    this._showAlalHesabPercent = false;
    this._showimagePercent = false;
    this.canShowEditButton = false;

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
