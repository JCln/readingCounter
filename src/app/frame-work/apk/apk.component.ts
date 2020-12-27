import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { IAPK } from './../../Interfaces/iapk';
import { ApkService } from './../../services/apk.service';
import { CloseTabService } from './../../services/close-tab.service';

@Component({
  selector: 'app-apk',
  templateUrl: './apk.component.html',
  styleUrls: ['./apk.component.scss']
})
export class ApkComponent implements OnInit, AfterViewInit, OnDestroy {
  uploadForm: IAPK = {
    versionCode: 0,
    versionName: '',
    file: null
  }
  subscription: Subscription[] = [];
  dataSource: IAPK[] = [];
  displayedColumns: string[] = ['versionName', 'versionCode', 'file'];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private interfaceManagerService: InterfaceManagerService,
    private apkService: ApkService
  ) { }
  // On file Select 
  onChange(event) {
    this.uploadForm.file = event.target.files[0];    
  }
  uploadFile = () => {
    this.apkService.upload(this.uploadForm);
  }  
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAPKPreList().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh)
      this.closeTabService.saveDataForAPKManager = '';
    if (this.closeTabService.saveDataForAPKManager)
      this.dataSource = this.closeTabService.saveDataForAPKManager;
    else
      this.dataSource = await this.getDataSource();
    console.log(this.dataSource);

  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/apk')
          this.classWrapper(true);
      }
    })
    )
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
