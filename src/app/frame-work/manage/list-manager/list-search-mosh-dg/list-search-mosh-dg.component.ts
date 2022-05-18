import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { Search } from 'src/app/classes/search';

import { MapDgComponent } from '../all/map-dg/map-dg.component';
import { BriefKardexComponent } from '../brief-kardex/brief-kardex.component';
import { ListSearchMoshWoumComponent } from './list-search-mosh-woum/list-search-mosh-woum.component';

@Component({
  selector: 'app-list-search-mosh-dg',
  templateUrl: './list-search-mosh-dg.component.html',
  styleUrls: ['./list-search-mosh-dg.component.scss']
})
export class ListSearchMoshDgComponent implements OnInit {
  dataSource: IOnOffLoadFlat[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  searchType: Search[];

  constructor(
    public listManagerService: ListManagerService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.listManagerService.searchReqMoshDialog.zoneId = this.config.data.zoneId;
    this.listManagerService.searchReqMoshDialog.item = parseInt(this.config.data.eshterak.toString().trim());
    console.log(this.listManagerService.searchReqMoshDialog);
    this.cdr.detectChanges();
    this.connectToServer();
  }
  converts = async () => {
    this.zoneDictionary = await this.listManagerService.getLMAllZoneDictionary();
    this.karbariDictionary = await this.listManagerService.getKarbariDictionary();
    this.karbariDictionaryCode = await this.listManagerService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.listManagerService.getQotrDictionary();
    if (this.listManagerService.searchReqMoshDialog.zoneId) {
      this.counterStateByCodeDictionary = await this.listManagerService.getCounterStateByCodeDictionary(this.listManagerService.searchReqMoshDialog.zoneId);      
      this.counterStateDictionary = await this.listManagerService.getCounterStateByZoneIdDictionary(this.listManagerService.searchReqMoshDialog.zoneId);      
      Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
      Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');    
    }

    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');    

    this.listManagerService.setDynamicPartRanges(this.dataSource);
  }
  connectToServer = async () => {
    if (!this.listManagerService.verificationMosh(this.listManagerService.searchReqMoshDialog))
      return;
    this.dataSource = await this.listManagerService.postBodyDataSource(ENInterfaces.ListSearchMoshtarak, this.listManagerService.searchReqMoshDialog);
    this.converts();
    this.listManagerService.makeHadPicturesToBoolean(this.dataSource);
  }
  close() {
    this.ref.close();
  }
  openMapDialog = (dataSource: any) => {
    if (this.listManagerService.showInMapSingleValidation(dataSource))
      this.ref = this.dialogService.open(MapDgComponent, {
        data: dataSource,
        rtl: true,
        width: '80%'
      })
    this.ref.onClose.subscribe(async res => {
      if (res)
        console.log(res);

    });
  }
  openWOUMDialog = (dataSource: any) => {
    this.ref = this.dialogService.open(ListSearchMoshWoumComponent, {
      data: dataSource,
      rtl: true,
      width: '80%'
    })
    this.ref.onClose.subscribe(async res => {
      if (res)
        console.log(res);

    });
  }
  openBriefKardexDialog = (dataSource: any) => {
    this.ref = this.dialogService.open(BriefKardexComponent, {
      data: {
        radif: dataSource.radif,
        zoneId: dataSource.zoneId
      },
      rtl: true,
      width: '90%'
    })
    this.ref.onClose.subscribe((res: any) => {
      if (res)
        console.log(res);
    });
  }
  refreshTable = () => {
    this.connectToServer();
  }


}
