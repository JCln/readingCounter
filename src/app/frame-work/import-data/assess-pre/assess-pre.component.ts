import { Component, Input, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IAssessPreDisplayDtoSimafa, IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { InteractionService } from 'services/interaction.service';
import { OutputManagerService } from 'services/output-manager.service';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';

import { AssesspreDgComponent } from './assesspre-dg/assesspre-dg.component';

@Component({
  selector: 'app-assess-pre',
  templateUrl: './assess-pre.component.html',
  styleUrls: ['./assess-pre.component.scss']
})
export class AssessPreComponent implements OnInit {

  _empty_message: string = '';

  _selectCols: any[] = [];
  _selectedColumns: any[];

  subscription: Subscription[] = [];

  dataSource: IOnOffLoadFlat[] = [];
  assessPreReq: IAssessPreDisplayDtoSimafa;
  zoneDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  ref: DynamicDialogRef;

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public importDynamicService: ImportDynamicService,
    public outputManagerService: OutputManagerService,
    private utilsService: UtilsService,
    private dialogService: DialogService,
  ) {
  }

  insertSelectedColumns = () => {
    this._selectCols = this.importDynamicService.columnAssessPre();
    this._selectedColumns = this.importDynamicService.customizeSelectedColumns(this._selectCols);
  }
  converts = () => {
    this._empty_message = EN_messages.notFound;
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');

    this.insertSelectedColumns();
    this.importDynamicService.setDynamicPartRanges(this.dataSource);
  }
  connectToServer = async () => {
    console.log(this.assessPreReq);
    
    this.dataSource = await this.importDynamicService.postAssess(ENInterfaces.postSimafaAssessPre, this.assessPreReq);
    this.counterStateDictionary = await this.importDynamicService.getCounterStateByZoneDictionary(this.assessPreReq.zoneId);
    this.counterStateByCodeDictionary = await this.importDynamicService.getCounterStateByCodeDictionary(this.assessPreReq.zoneId);
    this.karbariDictionary = await this.importDynamicService.getKarbariDictionary();
    this.qotrDictionary = await this.importDynamicService.getQotrDictionary();

    this.converts();
    this.importDynamicService.makeHadPicturesToBoolean(this.dataSource);

    this.closeTabService.saveDataForAssessPre = this.dataSource;
  }
  nullSavedSource = () => this.closeTabService.saveDataForAssessPre = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
      // is there any value to call apis
      if (this.importDynamicService.getAssessPre().listNumber !== '') {
        this.connectToServer();
        return;
      }
    }
    if (this.utilsService.isNull(this.closeTabService.saveDataForAssessPre)) {
      this.showSearchOptionsDialog();
    }
    else {
      this.dataSource = this.closeTabService.saveDataForAssessPre;
    }
    this.converts();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/imp/assesspre') {
          this.classWrapper(true);
        }
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
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  refreshTable = () => {
    this.classWrapper(true);
  }
  toDefaultVals = () => {
    this.dataSource = [];
  }

  showSearchOptionsDialog = () => {
    this.ref = this.dialogService.open(AssesspreDgComponent, {
      rtl: true,
      width: '90%'
    })
    this.ref.onClose.subscribe((res: IAssessPreDisplayDtoSimafa) => {
      if (res) {
        this.assessPreReq = res;
        this.connectToServer();
      }
    });
  }
}
