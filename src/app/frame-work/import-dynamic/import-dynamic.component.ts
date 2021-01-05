import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDictionaryManager, ISearchInOrderTo, ITrueFalse } from 'src/app/Interfaces/IDictionaryManager';
import { IImportDynamicDefault } from 'src/app/Interfaces/iimport-dynamic';
import { IZoneManager } from 'src/app/Interfaces/izone-manager';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DateJalaliComponent } from './../../core/_layouts/header/date-jalali/date-jalali.component';
import { ImportDynamicService } from './../../services/import-dynamic.service';
import { InterfaceService } from './../../services/interface.service';

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
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: 0
  }
  isTrueF: ITrueFalse[] = [
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
  ]

  _isOrderByDate: boolean = false;
  searchInOrderTo: ISearchInOrderTo[] = [
    {
      title: 'صدور بر اساس تاریخ :',
      isSelected: true
    },
    {
      title: 'صدور بر اساس دوره :',
      isSelected: false
    }
  ]
  _showAlalHesabPercent: boolean = false;
  _showimagePercent: boolean = false;
  kindId: number = 0;
  readingPeriodKindsDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  readingConfigDefault: string[] = [];
  userCounterReader: any;
  canShowEditButton: boolean = false;
  zoneDictionary: IZoneManager[] = [];
  dataSource: any;
  subscription: Subscription[] = [];

  constructor(
    private interfaceService: InterfaceService,
    private interactionService: InteractionService,
    private interfaceManagerService: InterfaceManagerService,
    private importDynamicService: ImportDynamicService
  ) { }
  connectToServer = () => {
    const validation = this.importDynamicService.checkVertification(this.importDynamic);
    if (!validation)
      return;
    this.interfaceService.postImportData(this.importDynamic).subscribe(res => {
      console.log(res);

    })
  }
  getZoneDictionary = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getZoneDictionaryManager().subscribe(res => {
          resolve(res);
        })
      });
    } catch {
      console.error(e => e);
    }
  }
  getReadingPeriodsKindDictionary = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getReadingPeriodKindManagerDictionary().subscribe(res => {
          resolve(res);
        })
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
  // private showEditButton = () => {
  //   if (!this.readingConfigDefault)
  //     return;
  //   this.canShowEditButton = true;
  // }
  private insertCounterReaderId = (cri: string) => {
    this.importDynamic.counterReaderId = cri;
  }
  verificationACounterReaderId = async () => {
    if (!this.importDynamic.zoneId || !this.zoneDictionary)
      return;
    this.readingConfigDefault = await this.getReadingConfigDefaults();
    this.userCounterReader = await this.getUserCounterReaders();
    this.insertReadingConfigDefaults(this.readingConfigDefault);
    this.insertCounterReaderId(this.userCounterReader);
  }
  verificationReadingPeriod = async () => {
    if (!this.importDynamic.zoneId || !this.zoneDictionary || !this.kindId)
      return;
    this.readingPeriodDictionary = await this.getReadingPeriod();
    console.log(this.readingPeriodDictionary);
  }

  classWrapper = async () => {
    this.readingPeriodKindsDictionary = await this.getReadingPeriodsKindDictionary();
    this.zoneDictionary = await this.getZoneDictionary();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/imd')
          this.ngOnInit();
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
