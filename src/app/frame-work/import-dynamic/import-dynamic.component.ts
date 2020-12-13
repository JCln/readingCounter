import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITrueFalse } from 'src/app/Interfaces/IDictionaryManager';
import { IZoneManager } from 'src/app/Interfaces/izone-manager';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

import { DateJalaliComponent } from './../../core/_layouts/header/date-jalali/date-jalali.component';
import { IImportDynamic } from './../../Interfaces/iimport-dynamic';
import { InterfaceService } from './../../services/interface.service';

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
    counterReaderId: ''
  }
  isTrueF: ITrueFalse[] = [
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
  ]
  zoneDictionary: IZoneManager[] = [];
  dataSource: any;
  subscription: Subscription[] = [];

  constructor(
    private interfaceService: InterfaceService,
    private interactionService: InteractionService,
    private snackWrapperService: SnackWrapperService,
    private interfaceManagerService: InterfaceManagerService,
    private router: Router
  ) { }
  connectToServer = () => {
    console.log(this.importDynamic);

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
  // getDataSource = (): Promise<any> => {
  //   return new Promise((resolve) => {
  //     this.interfaceManagerService.getZoneManager().subscribe(res => {
  //       if (res) {
  //         resolve(res);
  //       }
  //     })
  //   })
  // }
  classWrapper = async () => {
    // this.dataSource = await this.getDataSource();
    this.zoneDictionary = await this.getZoneDictionary();

    // this.convertIdToTitle(this.dataSource.data, this.zoneDictionary);

  }
  ngOnInit() {
    this.classWrapper();
  }
  closeTabStatus = () => {
    this.subscription.push(this.interactionService.getClosedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url) {
          console.log('close this page please');

        }
      }
    })
    )
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url)
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
    this.closeTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe);
  }

}
