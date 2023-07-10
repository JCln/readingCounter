import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IReadingConfigDefault } from 'interfaces/iimports';
import { IImportDataResponse, IImportSimafaSingleReq, IReadingProgramRes } from 'interfaces/import-data';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { UtilsService } from 'services/utils.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-simafa-single',
  templateUrl: './simafa-single.component.html',
  styleUrls: ['./simafa-single.component.scss']
})
export class SimafaSingleComponent extends FactoryONE {
  _canShowAddButton: boolean = true;
  _readingProgramRes: IReadingProgramRes;
  simafaSingleReq: IImportSimafaSingleReq = {
    zoneId: 0,
    alalHesabPercent: null,
    imagePercent: null,
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
    counterReaderId: '',
    readingPeriodId: null,
    year: this.utilsService.getFirstYear(),
    readingProgramId: ''
  }
  _showAlalHesabPercent: boolean = false;

  readingConfigDefault: IReadingConfigDefault;
  userCounterReaderDictionary: IDictionaryManager[] = [];
  dataSource: IImportDataResponse;

  constructor(
    public importDynamicService: ImportDynamicService,
    private utilsService: UtilsService,
    private route: ActivatedRoute
  ) {
    super();
  }

  getRouteParams = () => {
    this.simafaSingleReq.readingProgramId = this.route.snapshot.paramMap.get('id');
    this.simafaSingleReq.zoneId = parseInt(this.route.snapshot.paramMap.get('zoneId'));
    this.simafaSingleReq.year = parseInt(this.route.snapshot.paramMap.get('year'));
    this.simafaSingleReq.readingPeriodId = parseInt(this.route.snapshot.paramMap.get('readingPeriodId'));
  }
  connectToServer = async (canRefresh?: boolean) => {
    if (!this.importDynamicService.verificationReadingConfigDefault(this.readingConfigDefault, this.simafaSingleReq))
      return;
    const validation = this.importDynamicService.checkSimafaSingleVertification(this.simafaSingleReq);
    if (!validation)
      return;
    const a = await this.importDynamicService.postBodyServer(ENInterfaces.postSimafaSingle, this.simafaSingleReq);
    if (a) {

      this.importDynamicService.showResDialog(a, false, EN_messages.importDynamic_created);
      this._canShowAddButton = false;
    }
  }
  // nullSavedSource = () => this.closeTabService.saveDataForImportDynamic = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      // this.nullSavedSource();
    }
    this._readingProgramRes = this.importDynamicService.columnSimafaSingle();
    this.getRouteParams();
    this.selectedZoneId();

    this.readingConfigDefault = await this.importDynamicService.dictionaryWrapperService.getReadingConfigDefaultByZoneIdDictionary(this.simafaSingleReq.zoneId);
    this.insertReadingConfigDefaults(this.readingConfigDefault);
  }
  selectedZoneId = async () => {
    this.userCounterReaderDictionary = await this.importDynamicService.dictionaryWrapperService.getUserCounterReaderDictionary(this.simafaSingleReq.zoneId);
  }
  private insertReadingConfigDefaults = (rcd: IReadingConfigDefault) => {
    this.simafaSingleReq.hasPreNumber = rcd.defaultHasPreNumber;
    this.simafaSingleReq.displayBillId = rcd.displayBillId;
    this.simafaSingleReq.displayRadif = rcd.displayRadif;
    this.simafaSingleReq.imagePercent = rcd.defaultImagePercent;
    this.simafaSingleReq.alalHesabPercent = rcd.defaultAlalHesab;
  }
}
