import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IImportSimafaReadingProgramsReq, IReadingProgramRes } from 'interfaces/import-data';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { IFragmentDetailsByEshterakReq } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { InteractionService } from 'services/interaction.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-simafa-reading-prog',
  templateUrl: './simafa-reading-prog.component.html',
  styleUrls: ['./simafa-reading-prog.component.scss']
})
export class SimafaReadingProgComponent extends FactoryONE {
  importSimafaReadingProgram: IImportSimafaReadingProgramsReq = {
    zoneId: 0,
    readingPeriodId: 0,
    year: 1400
  }
  _fragmentDetailsEshterak: IFragmentDetailsByEshterakReq = {
    fromEshterak: null,
    toEshterak: null,
    zoneId: null
  };

  _empty_message: string = '';
  kindId: number = 0;
  _years: ITitleValue[] = [];
  _selectedKindId: string = '';
  readingPeriodKindsDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  dataSource: IReadingProgramRes[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private importDynamicService: ImportDynamicService,
    public route: ActivatedRoute
  ) {
    super();
  }

  connectToServer = async () => {
    if (!this.importDynamicService.checkSimafaVertification(this.importSimafaReadingProgram))
      return;
    // Save and send data to service
    this.dataSource = await this.importDynamicService.postImportSimafaRDPG(ENInterfaces.postSimafaReadingProgram, this.importSimafaReadingProgram);
    this.closeTabService.saveDataForSimafaReadingPrograms = this.dataSource;

    if (!this.dataSource) {
      this._empty_message = EN_messages.notFound;
      return;
    }
    this.insertSelectedColumns();
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
  }
  insertSelectedColumns = () => {
    this._selectCols = this.importDynamicService.columnSimafaReadingProgram();
    this._selectedColumns = this.importDynamicService.customizeSelectedColumns(this._selectCols);
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.importDynamicService.getReadingPeriodDictionary(this._selectedKindId);
  }
  nullSavedSource = () => this.closeTabService.saveDataForSimafaReadingPrograms = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.importSimafaReadingProgram = this.importDynamicService.columnGetSimafaRDPG();
    if (this.closeTabService.saveDataForSimafaReadingPrograms) {
      this.dataSource = this.closeTabService.saveDataForSimafaReadingPrograms;
      this.insertSelectedColumns();
    }
    this.readingPeriodKindsDictionary = await this.importDynamicService.getReadingPeriodsKindDictionary();
    this.zoneDictionary = await this.importDynamicService.getZoneDictionary();
    this._years = this.importDynamicService.getYears();
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/imp/simafa/rdpg') {
          this.connectToServer();
        }
      }
    })
    )
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
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
