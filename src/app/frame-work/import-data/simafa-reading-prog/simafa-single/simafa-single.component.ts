import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IImportDataResponse, IImportSimafaSingleReq, IReadingProgramRes } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { InteractionService } from 'services/interaction.service';

@Component({
  selector: 'app-simafa-single',
  templateUrl: './simafa-single.component.html',
  styleUrls: ['./simafa-single.component.scss']
})
export class SimafaSingleComponent implements OnInit, AfterViewInit, OnDestroy {

  _readingProgramRes: IReadingProgramRes;
  simafaSingleReq: IImportSimafaSingleReq = {
    zoneId: 0,
    alalHesabPercent: 5,
    imagePercent: 5,
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
    counterReaderId: '',
    readingPeriodId: null,
    year: 1400,
    readingProgramId: ''
  }
  _showAlalHesabPercent: boolean = false;

  userCounterReaderDictionary: IDictionaryManager[] = [];
  dataSource: IImportDataResponse;
  subscription: Subscription[] = [];

  constructor(
    private interactionService: InteractionService,
    public importDynamicService: ImportDynamicService,
    private closeTabService: CloseTabService,
    private route: ActivatedRoute
  ) { }

  getRouteParams = () => {
    this.simafaSingleReq.readingProgramId = this.route.snapshot.paramMap.get('id');
    this.simafaSingleReq.zoneId = parseInt(this.route.snapshot.paramMap.get('zoneId'));
    this.simafaSingleReq.year = parseInt(this.route.snapshot.paramMap.get('year'));
    this.simafaSingleReq.readingPeriodId = parseInt(this.route.snapshot.paramMap.get('readingPeriodId'));
  }
  connectToServer = async () => {
    console.log(this.simafaSingleReq);

    const validation = this.importDynamicService.checkSimafaSingleVertification(this.simafaSingleReq);
    if (!validation)
      return;
    this.importDynamicService.showResDialog(await this.importDynamicService.postImportSimafa(ENInterfaces.postSimafaSingle, this.simafaSingleReq), false, EN_messages.importDynamic_created)
  }
  // nullSavedSource = () => this.closeTabService.saveDataForImportDynamic = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      // this.nullSavedSource();
    }
    this._readingProgramRes = this.importDynamicService.columnSimafaSingle();
    this.getRouteParams();
    this.selectedZoneId();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/imp/simafa/rdpg/single') {
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
  selectedZoneId = async () => {
    this.userCounterReaderDictionary = await this.importDynamicService.getUserCounterReaders(this.simafaSingleReq.zoneId);
  }
}
