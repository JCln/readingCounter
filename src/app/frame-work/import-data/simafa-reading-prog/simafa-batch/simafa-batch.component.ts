import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFragmentDetails, IFragmentDetailsByEshterakReq } from 'interfaces/imanage';
import { IImportSimafaBatchReq, IReadingProgramRes } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { InteractionService } from 'services/interaction.service';

@Component({
  selector: 'app-simafa-batch',
  templateUrl: './simafa-batch.component.html',
  styleUrls: ['./simafa-batch.component.scss']
})
export class SimafaBatchComponent implements OnInit {
  _fragmentDetailsEshterak: IFragmentDetailsByEshterakReq = {
    fromEshterak: null,
    toEshterak: null,
    zoneId: null
  };
  _readingProgramRes: IReadingProgramRes;
  _routeAndReaderIds: IDictionaryManager[] = [];
  testCounterReaders: IDictionaryManager[];
  simafaBatchReq: IImportSimafaBatchReq = {
    routeAndReaderIds: [{ routeId: null, counterReaderId: null }],
    fragmentMasterId: '',
    zoneId: 0,
    alalHesabPercent: 5,
    imagePercent: 5,
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
    readingPeriodId: null,
    year: 1400,
    readingProgramId: ''
  }

  userCounterReaderDictionary: IDictionaryManager[] = [];
  dataSource: IFragmentDetails[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  _selectCols: any = [];
  _selectedColumns: any[];
  subscription: Subscription[] = [];

  constructor(
    private interactionService: InteractionService,
    public importDynamicService: ImportDynamicService,
    private closeTabService: CloseTabService,
    private route: ActivatedRoute
  ) { }

  getRouteParams = () => {
    this.simafaBatchReq.readingProgramId = this.route.snapshot.paramMap.get('id');
    this.simafaBatchReq.readingPeriodId = parseInt(this.route.snapshot.paramMap.get('readingPeriodId'));
    this.simafaBatchReq.zoneId = parseInt(this.route.snapshot.paramMap.get('zoneId'));
    this.simafaBatchReq.year = parseInt(this.route.snapshot.paramMap.get('year'));

    this._fragmentDetailsEshterak.fromEshterak = this.route.snapshot.paramMap.get('fromEshterak');
    this._fragmentDetailsEshterak.toEshterak = this.route.snapshot.paramMap.get('toEshterak');
    this._fragmentDetailsEshterak.zoneId = parseInt(this.route.snapshot.paramMap.get('zoneId'));
  }
  connectToServer = async () => {
    console.log(this.simafaBatchReq);
    
    // this.assingUserIdsToCounterReaderId();



    // const validation = this.importDynamicService.checkSimafaSingleVertification(this.simafaBatchReq);
    // if (!validation)
    //   return;
    // this.importDynamicService.showResDialog(await this.importDynamicService.postImportSimafa(ENInterfaces.postSimafaSingle, this.simafaBatchReq), false, EN_messages.importDynamic_created)
  }
  // nullSavedSource = () => this.closeTabService.saveDataForImportDynamic = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      // this.nullSavedSource();
    }
    this.getRouteParams();
    this.getApiCalls();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/imp/simafa/rdpg/batch') {
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
  getApiCalls = async () => {
    this.dataSource = await this.importDynamicService.postFragmentDetailsByEshterak(this._fragmentDetailsEshterak);
    if (!this.dataSource) return;

    this.dataSource.length
    for (let index = 1; index < this.dataSource.length; index++) {
      this.simafaBatchReq.routeAndReaderIds.push({ routeId: null, counterReaderId: null })
    }
    this.simafaBatchReq.fragmentMasterId = this.dataSource[0].fragmentMasterId;
    this.userCounterReaderDictionary = await this.importDynamicService.getUserCounterReaders(this.simafaBatchReq.zoneId);

    this.insertSelectedColumns();
    this.assingIdToRouteId();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.importDynamicService.columnSimafaBatch();
    this._selectedColumns = this.importDynamicService.customizeSelectedColumns(this._selectCols);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  assingIdToRouteId = () => {
    this.dataSource.forEach((item, index) => {
      this.simafaBatchReq.routeAndReaderIds[index].routeId = item.id;
    })
    console.log(this.simafaBatchReq);

  }
  // is it always assign true counter reader id to correct row ?
  assingUserIdsToCounterReaderId = () => {
    this._routeAndReaderIds.forEach((item, index) => {
      this.simafaBatchReq.routeAndReaderIds[index].counterReaderId = item.id

    })
    console.log(this.simafaBatchReq);
  }

}
