import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { Search } from 'src/app/classes/search';

import { MapDgComponent } from '../all/map-dg/map-dg.component';

@Component({
  selector: 'app-list-search-mosh-dg',
  templateUrl: './list-search-mosh-dg.component.html',
  styleUrls: ['./list-search-mosh-dg.component.scss']
})
export class ListSearchMoshDgComponent implements OnInit {
  dataSource: IOnOffLoadFlat[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  deleteDictionary: IDictionaryManager[] = [];
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
    this.cdr.detectChanges();
    this.connectToServer();
  }
  converts = async () => {
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.zoneDictionary = await this.listManagerService.getLMAllZoneDictionary();
    this.karbariDictionaryCode = await this.listManagerService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.listManagerService.getQotrDictionary();
    this.counterStateByCodeDictionary = await this.listManagerService.getCounterStateByCodeDictionary(this.listManagerService.searchReqMoshDialog.zoneId);
    this.counterStateDictionary = await this.listManagerService.getCounterStateByZoneIdDictionary(this.listManagerService.searchReqMoshDialog.zoneId);


    this.dataSource =
      Converter.convertIdsToTitles(
        this.dataSource,
        {
          zoneDictionary: this.zoneDictionary,
          deleteDictionary: this.deleteDictionary,
          counterStateDictionary: this.counterStateDictionary,
          counterStateByCodeDictionary: this.counterStateByCodeDictionary,
          karbariDictionaryCode: this.karbariDictionaryCode,
          qotrDictionary: this.qotrDictionary,
        },
        {
          zoneId: 'zoneId',
          hazf: 'hazf',
          counterStateId: 'counterStateId',
          preCounterStateCode: 'preCounterStateCode',
          possibleKarbariCode: 'possibleKarbariCode',
          qotrCode: 'qotrCode'
        })
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');

    // this.listManagerService.setDynamicPartRanges(this.dataSource);
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
  refreshTable = () => {
    this.connectToServer();
  }

}
