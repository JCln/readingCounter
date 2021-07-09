import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { InteractionService } from 'services/interaction.service';
import { DateJalaliComponent } from 'src/app/core/_layouts/header/date-jalali/date-jalali.component';
import { IImportDynamicDefault } from 'src/app/Interfaces/inon-manage';
import { IDictionaryManager, ISearchInOrderTo, ITrueFalse } from 'src/app/Interfaces/ioverall-config';


@Component({
  selector: 'app-import-dynamic',
  templateUrl: './import-dynamic.component.html',
  styleUrls: ['./import-dynamic.component.scss']
})
export class ImportDynamicComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DateJalaliComponent) date;

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

  kindId: number = 0;
  readingPeriodKindsDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  readingConfigDefault: string[] = [];
  userCounterReader: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  dataSource: any;
  subscription: Subscription[] = [];

  constructor(
    private interactionService: InteractionService,
    private importDynamicService: ImportDynamicService,
    private closeTabService: CloseTabService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  connectToServer = async () => {
    const validation = this.importDynamicService.checkVertification(this.importDynamic, this._isOrderByDate);
    if (!validation)
      return;
    this.importDynamicService.showResDialog(await this.importDynamicService.postImportDynamicData(this.importDynamic));
    this.resetToDefaultFormStatus();
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getReadingPeriodsKindDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getPeriodKindDictionary();
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
      this.nullSavedSource();
    }
    this.readingPeriodKindsDictionary = await this.getReadingPeriodsKindDictionary();
    if (!this.importDynamicService.validationPeriodKind(this.readingPeriodKindsDictionary))
      this.readingPeriodKindsDictionary = [];
    this.zoneDictionary = await this.getZoneDictionary();
    if (!this.importDynamicService.validationZoneDictionary(this.zoneDictionary))
      this.zoneDictionary = [];
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/imd') {
          this.resetToDefaultFormStatus();
          this.classWrapper(true);
        }
      }
    })
    )
  }
  receiveFromDateJalali = ($event: string) => {
    this.importDynamic.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.importDynamic.toDate = $event;
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
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

}
