import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { Search } from 'src/app/classes/search';

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
  // _searchByInfo: string = 'مقدار';

  constructor(
    public listManagerService: ListManagerService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private cdr: ChangeDetectorRef,
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
    this.counterStateDictionary = await this.listManagerService.getCounterStateDictionary();
    this.karbariDictionary = await this.listManagerService.getKarbariDictionary();
    this.karbariDictionaryCode = await this.listManagerService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.listManagerService.getQotrDictionary();
    if (this.listManagerService.searchReqMoshDialog.zoneId) {
      this.counterStateByCodeDictionary = await this.listManagerService.getCounterStateByCodeDictionary(this.listManagerService.searchReqMoshDialog.zoneId);
      Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
      Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    }

    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');

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

}
