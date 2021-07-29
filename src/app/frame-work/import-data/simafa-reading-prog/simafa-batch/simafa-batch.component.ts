import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IImportDataResponse, IImportSimafaBatchReq, IReadingProgramRes } from 'interfaces/inon-manage';
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

  _readingProgramRes: IReadingProgramRes;
  simafaBatchReq: IImportSimafaBatchReq = {
    routeAndReaderIds: [{ routeId: '', counterReaderId: '' }],
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
  fragmentMasterDictionary: IDictionaryManager[] = [];
  dataSource: IImportDataResponse;
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
  }
  connectToServer = async () => {
    console.log(this.simafaBatchReq);
    
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
    this._readingProgramRes = this.importDynamicService.columnSimafaSingle();
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
    this.userCounterReaderDictionary = await this.importDynamicService.getCounterStateByZoneDictionary(this.simafaBatchReq.zoneId);
    this.fragmentMasterDictionary = await this.importDynamicService.getFragmentMasterDictionary(this.simafaBatchReq.zoneId);
  }

}
