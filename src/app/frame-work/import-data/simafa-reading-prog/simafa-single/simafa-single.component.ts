import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IReadingConfigDefault } from 'interfaces/iimports';
import { IImportDataResponse, IReadingProgramRes } from 'interfaces/import-data';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { PageSignsService } from 'services/page-signs.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-simafa-single',
  templateUrl: './simafa-single.component.html',
  styleUrls: ['./simafa-single.component.scss']
})
export class SimafaSingleComponent extends FactoryONE {
  _readingProgramRes: IReadingProgramRes;
  _showAlalHesabPercent: boolean = false;

  readingConfigDefault: IReadingConfigDefault;
  userCounterReaderDictionary: IDictionaryManager[] = [];
  dataSource: IImportDataResponse;

  constructor(
    public importDynamicService: ImportDynamicService,
    public closeTabService: CloseTabService,
    public pageSignsService: PageSignsService,

  ) {
    super();
  }
  connectToServer = async () => {
    if (!this.importDynamicService.verificationService.verificationReadingConfigDefault(this.readingConfigDefault, this.closeTabService.simafaSingleReq))
      return;
    const validation = this.importDynamicService.verificationService.checkSimafaSingleVertification(this.closeTabService.simafaSingleReq);
    if (!validation)
      return;
    const a = await this.importDynamicService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.postSimafaSingle, this.closeTabService.simafaSingleReq);
    if (a) {
      this.importDynamicService.showResDialog(a, false, EN_messages.importDynamic_created);
      this.pageSignsService.simafaSingle_pageSign._canShowAddButton = false;
    }
  }
  selectedZoneId = async () => {
    this.userCounterReaderDictionary = await this.importDynamicService.dictionaryWrapperService.getUserCounterReaderDictionary(this.closeTabService.simafaSingleReq.zoneId);
  }
  assignToSingleRequest() {
    this.closeTabService.simafaSingleReq.readingProgramId = this.pageSignsService.simafaSingle_pageSign.UUID;
    this.closeTabService.simafaSingleReq.readingPeriodId = this.pageSignsService.simafaSingle_pageSign.readingPeriodId;
    this.closeTabService.simafaSingleReq.year = this.pageSignsService.simafaSingle_pageSign.year;
    this.closeTabService.simafaSingleReq.zoneId = this.pageSignsService.simafaSingle_pageSign.zoneId;
  }
  private insertReadingConfigDefaults = (rcd: IReadingConfigDefault) => {
    this.closeTabService.simafaSingleReq.displayBillId = rcd.displayBillId ? rcd.displayBillId : false;
    this.closeTabService.simafaSingleReq.displayRadif = rcd.displayRadif ? rcd.displayRadif : false;
    this.closeTabService.simafaSingleReq.displayPreDate = rcd.displayPreDate ? rcd.displayPreDate : false;
    this.closeTabService.simafaSingleReq.displayMobile = rcd.displayMobile ? rcd.displayMobile : false;
    this.closeTabService.simafaSingleReq.hasImage = rcd.hasImage ? rcd.hasImage : false;
    this.closeTabService.simafaSingleReq.displayDebt = rcd.displayDebt ? rcd.displayDebt : false;
    this.closeTabService.simafaSingleReq.displayIcons = rcd.displayIcons ? rcd.displayIcons : false;
    this.closeTabService.simafaSingleReq.hasPreNumber = rcd.defaultHasPreNumber;
    this.closeTabService.simafaSingleReq.imagePercent = rcd.defaultImagePercent;
    this.closeTabService.simafaSingleReq.alalHesabPercent = rcd.defaultAlalHesab;
  }
  classWrapper = async () => {
    if (!this.pageSignsService.simafaSingle_pageSign.UUID) {
      this.closeTabService.utilsService.routeTo(EN_Routes.wrimpsimafardpg);
      return;
    }
    this.assignToSingleRequest();
    this._readingProgramRes = this.importDynamicService.columnSimafaSingle();
    this.selectedZoneId();

    this.readingConfigDefault = await this.importDynamicService.dictionaryWrapperService.getReadingConfigDefaultByZoneIdDictionary(this.closeTabService.simafaSingleReq.zoneId);
    this.insertReadingConfigDefaults(this.readingConfigDefault);
  }
}
