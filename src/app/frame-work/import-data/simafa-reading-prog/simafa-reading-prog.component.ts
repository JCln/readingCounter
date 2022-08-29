import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IReadingProgramRes } from 'interfaces/import-data';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { IFragmentDetailsByEshterakReq } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-simafa-reading-prog',
  templateUrl: './simafa-reading-prog.component.html',
  styleUrls: ['./simafa-reading-prog.component.scss']
})
export class SimafaReadingProgComponent extends FactoryONE {
  _fragmentDetailsEshterak: IFragmentDetailsByEshterakReq = {
    fromEshterak: null,
    toEshterak: null,
    zoneId: null
  };

  _empty_message: string = '';
  kindId: number = 0;
  _years: ITitleValue[] = [];
  readingPeriodKindsDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  dataSource: IReadingProgramRes[] = [];

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
      this.dataSource = await this.importDynamicService.postImportSimafaRDPG(ENInterfaces.postSimafaReadingProgram, this.closeTabService.importSimafaReadingProgramReq);
      this.closeTabService.saveDataForSimafaReadingPrograms = this.dataSource;

      if (!this.dataSource) {
        this._empty_message = EN_messages.notFound;
        return;
      }
      Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    }
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.importDynamicService.getReadingPeriodDictionary(this.closeTabService.importSimafaReadingProgramReq.kindId);
  }
  nullSavedSource = () => this.closeTabService.saveDataForSimafaReadingPrograms = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.closeTabService.importSimafaReadingProgramReq = this.importDynamicService.columnGetSimafaRDPG();
    if (this.closeTabService.saveDataForSimafaReadingPrograms) {
      this.dataSource = this.closeTabService.saveDataForSimafaReadingPrograms;
      this.getReadingPeriod();
    }
    this.readingPeriodKindsDictionary = await this.importDynamicService.getReadingPeriodsKindDictionary();
    this.zoneDictionary = await this.importDynamicService.getZoneDictionary();
    this._years = this.importDynamicService.getYears();
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
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
