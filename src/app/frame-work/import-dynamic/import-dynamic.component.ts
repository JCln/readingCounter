import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITrueFalse } from 'src/app/Interfaces/IDictionaryManager';
import { IZoneManager } from 'src/app/Interfaces/izone-manager';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DateJalaliComponent } from './../../core/_layouts/header/date-jalali/date-jalali.component';
import { IImportDynamic } from './../../Interfaces/iimport-dynamic';
import { ImportDynamicService } from './../../services/import-dynamic.service';
import { InterfaceService } from './../../services/interface.service';

interface ISearchInOrderTo {
  title: string;
  isSelected: boolean;
}
@Component({
  selector: 'app-import-dynamic',
  templateUrl: './import-dynamic.component.html',
  styleUrls: ['./import-dynamic.component.scss']
})
export class ImportDynamicComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DateJalaliComponent) date;

  importDynamic: IImportDynamic = {
    fromEshterak: '',
    toEshterak: '',
    zoneId: 0,
    alalHesabPercent: 0,
    imagePercent: 0,
    hasPreNumber: true,
    displayBillId: true,
    displayRadif: true,
    fromDate: '',
    toDate: '',
    counterReaderId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  }
  isTrueF: ITrueFalse[] = [
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
  ]

  _isOrderByDate: boolean = false;
  searchInOrderTo: ISearchInOrderTo[] = [
    {
      title: 'جستجو بر اساس تاریخ :',
      isSelected: true
    },
    {
      title: 'جستجو بر اساس دوره :',
      isSelected: false
    }
  ]
  readingPeriodKindsDictionary: string[] = [];
  userCounterReader: any;
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
          if (res)
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
          if (res)
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
          if (res)
            resolve(res);
        })
      });
    } catch (error) {
      console.error(e => e);
    }
  }
  verificationACounterReaderId = async () => {
    if (!this.readingPeriodKindsDictionary || !this.zoneDictionary)
      return;
    this.userCounterReader = await this.getUserCounterReaders();
    console.log(this.userCounterReader);
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
