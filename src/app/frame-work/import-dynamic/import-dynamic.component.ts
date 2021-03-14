import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { DateJalaliComponent } from 'src/app/core/_layouts/header/date-jalali/date-jalali.component';
import { IZoneManager } from 'src/app/Interfaces/imanage';
import { IImportDynamicDefault } from 'src/app/Interfaces/inon-manage';
import { IDictionaryManager, ISearchInOrderTo, ITrueFalse } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { ImportDynamicService } from 'src/app/services/import-dynamic.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { InterfaceService } from 'src/app/services/interface.service';

import { DictionaryWrapperService } from './../../services/dictionary-wrapper.service';

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
  _isOrderByDate: boolean = false;
  _showAlalHesabPercent: boolean = false;
  _showimagePercent: boolean = false;
  canShowEditButton: boolean = false;

  kindId: number = 0;
  readingPeriodKindsDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  readingConfigDefault: string[] = [];
  userCounterReader: IDictionaryManager[] = [];
  zoneDictionary: IZoneManager[] = [];
  dataSource: any;
  subscription: Subscription[] = [];

  constructor(
    private interfaceService: InterfaceService,
    private interactionService: InteractionService,
    private interfaceManagerService: InterfaceManagerService,
    private importDynamicService: ImportDynamicService,
    private closeTabService: CloseTabService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  connectToServer = () => {
    const validation = this.importDynamicService.checkVertification(this.importDynamic, this._isOrderByDate);
    if (!validation)
      return;
    this.interfaceService.postImportData(this.importDynamic).subscribe(res => {
      this.importDynamicService.showResDialog(res);
    })
  }
  getZoneDictionary = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        resolve(this.dictionaryWrapperService.getZoneDictionary());
      });
    } catch {
      console.error(e => e);
    }
  }
  getReadingPeriodsKindDictionary = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        resolve(this.dictionaryWrapperService.getPeriodKindDictionary());
      });
    } catch {
      console.error(e => e);
    }
  }
  getReadingPeriod = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getReadingPeriodManagerDictionaryByZoneIdAndKindId(this.importDynamic.zoneId, this.kindId).subscribe(res => {
          resolve(res);
        })
      });
    } catch {
      console.error(e => e);
    }
  }
  getReadingConfigDefaults = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getReadingConfigDefaultByZoneId(this.importDynamic.zoneId).subscribe(res => {
          resolve(res);
        })
      });
    } catch {
      console.error(e => e);
    }
  }
  getUserCounterReaders = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getCounterReadersByZoneId(this.importDynamic.zoneId).subscribe(res => {
          resolve(res);
        })
      });
    } catch (error) {
      console.error(e => e);
    }
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
    if (!this.importDynamic.zoneId || !this.zoneDictionary)
      return;
    this.readingConfigDefault = await this.getReadingConfigDefaults();
    if (!this.importDynamicService.validationReadingConfigDefault(this.readingConfigDefault)) {
      this.readingConfigDefault = [];
      return;
    }
    this.userCounterReader = await this.getUserCounterReaders();
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
    this.readingPeriodDictionary = await this.getReadingPeriod();
    this.importDynamicService.validationReadingPeriod(this.readingPeriodDictionary);

  }
  nullSavedSource = () => this.closeTabService.saveDataForImportDynamic = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh)
      this.nullSavedSource();
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
        if (res === '/wr/imd')
          this.classWrapper(true);
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

}
