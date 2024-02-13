import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IFragmentDetailsByEshterakReq } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-simafa-reading-prog',
  templateUrl: './simafa-reading-prog.component.html',
  styleUrls: ['./simafa-reading-prog.component.scss'],
  animations: [transitionAnimation]
})
export class SimafaReadingProgComponent extends FactoryONE {
  _fragmentDetailsEshterak: IFragmentDetailsByEshterakReq = {
    fromEshterak: null,
    toEshterak: null,
    zoneId: null
  };

  readingPeriodKindsDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public closeTabService: CloseTabService,
    private importDynamicService: ImportDynamicService,
    public route: ActivatedRoute
  ) {
    super();
  }

  connectToServer = async () => {
    if (this.importDynamicService.checkSimafaVertification(this.closeTabService.importSimafaReadingProgramReq)) {
      // Save and send data to service
      this.importDynamicService.insertToSimafaRdpgReq(this.closeTabService.importSimafaReadingProgramReq);
      this.closeTabService.saveDataForSimafaReadingPrograms = await this.importDynamicService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.postSimafaReadingProgram, this.closeTabService.importSimafaReadingProgramReq);
      Converter.convertIdToTitle(this.closeTabService.saveDataForSimafaReadingPrograms, this.zoneDictionary, 'zoneId');
    }
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.readingPeriodDictionary = [];
    this.closeTabService.importSimafaReadingProgramReq.readingPeriodId = null;
    this.closeTabService.importSimafaReadingProgramReq.kindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.importSimafaReadingProgramReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    if (this.closeTabService.importSimafaReadingProgramReq.kindId)
      this.readingPeriodDictionary = await this.importDynamicService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.closeTabService.importSimafaReadingProgramReq.zoneId, this.closeTabService.importSimafaReadingProgramReq.kindId);
  }
  classWrapper = async () => {
    this.closeTabService.importSimafaReadingProgramReq = this.importDynamicService.columnGetSimafaRDPG();
    this.readingPeriodKindsDictionary = await this.importDynamicService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.importDynamicService.dictionaryWrapperService.getZoneDictionary();
    this.getReadingPeriod();
    Converter.convertIdToTitle(this.closeTabService.saveDataForSimafaReadingPrograms, this.zoneDictionary, 'zoneId');
  }
  routeToBatch = (dataSource: any) => {
    let dataSourceTemp = JSON.parse(JSON.stringify(dataSource));
    if (typeof dataSourceTemp.zoneId !== 'object') {
      this.zoneDictionary.find(item => {
        if (item.title === dataSourceTemp.zoneId)
          dataSourceTemp.zoneId = item.id
      })
    } else {
      dataSourceTemp.zoneId = dataSourceTemp.zoneId['id'];
    }

    this.importDynamicService.routeToSimafaBatch(dataSourceTemp);
  }
  routeToSingle = (dataSource: any) => {
    let dataSourceTemp = JSON.parse(JSON.stringify(dataSource));
    if (typeof dataSourceTemp.zoneId !== 'object') {
      this.zoneDictionary.find(item => {
        if (item.title === dataSourceTemp.zoneId)
          dataSourceTemp.zoneId = item.id
      })
    } else {
      dataSourceTemp.zoneId = dataSourceTemp.zoneId['id'];
    }

    this.importDynamicService.routeToSimafaSingle(dataSourceTemp);
  }

}
