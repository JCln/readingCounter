import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
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

  _empty_message: string = '';
  _years: ITitleValue[] = [];
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
      this.closeTabService.saveDataForSimafaReadingPrograms = await this.importDynamicService.postImportSimafaRDPG(ENInterfaces.postSimafaReadingProgram, this.closeTabService.importSimafaReadingProgramReq);
      Converter.convertIdToTitle(this.closeTabService.saveDataForSimafaReadingPrograms, this.zoneDictionary, 'zoneId');
    }
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.importDynamicService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.importSimafaReadingProgramReq.kindId);
  }
  nullSavedSource = () => this.closeTabService.saveDataForSimafaReadingPrograms = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.closeTabService.importSimafaReadingProgramReq = this.importDynamicService.columnGetSimafaRDPG();
    if (this.closeTabService.saveDataForSimafaReadingPrograms) {
      this.getReadingPeriod();
    }
    this.readingPeriodKindsDictionary = await this.importDynamicService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.importDynamicService.dictionaryWrapperService.getZoneDictionary();
    this._years = this.importDynamicService.getYears();
    Converter.convertIdToTitle(this.closeTabService.saveDataForSimafaReadingPrograms, this.zoneDictionary, 'zoneId');
  }
  refreshTable = () => {
    this.connectToServer();
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
