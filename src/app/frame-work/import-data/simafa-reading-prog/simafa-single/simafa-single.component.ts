import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IImportDataResponse, IImportSimafaSingleReq, IReadingProgramRes } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { InteractionService } from 'services/interaction.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-simafa-single',
  templateUrl: './simafa-single.component.html',
  styleUrls: ['./simafa-single.component.scss']
})
export class SimafaSingleComponent extends FactoryONE {

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
    public interactionService: InteractionService,
    public importDynamicService: ImportDynamicService,
    private closeTabService: CloseTabService,
    private route: ActivatedRoute
  ) {
    super(interactionService);
  }

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
  selectedZoneId = async () => {
    this.userCounterReaderDictionary = await this.importDynamicService.getUserCounterReaders(this.simafaSingleReq.zoneId);
  }
}
