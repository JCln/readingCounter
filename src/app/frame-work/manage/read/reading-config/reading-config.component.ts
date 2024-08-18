import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingConfigDefault } from 'interfaces/iimports';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReadingConfigDgComponent } from './reading-config-dg/reading-config-dg.component';

@Component({
  selector: 'app-reading-config',
  templateUrl: './reading-config.component.html',
  styleUrls: ['./reading-config.component.scss']
})
export class ReadingConfigComponent extends FactoryONE {
  ref: DynamicDialogRef;
  editableDataSource = [];
  zoneDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IReadingConfigDefault; } = {};

  constructor(
    public dialogService: DialogService,
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) {
    super();
  }

  openDialog = (item?: any) => {
    this.ref = this.dialogService.open(ReadingConfigDgComponent, {
      data: item,
      rtl: true,
      contentStyle: { minWidth: '21rem' }
    })
    this.ref.onClose.subscribe(async res => {
      if (res) {
        this.callAPI();
      }
    });
  }
  insertToAuxZoneid = () => {
    this.closeTabService.saveDataForReadingConfig.forEach(item => {
      item.dynamicId = item.zoneId;
    })
  }
  callAPI = async () => {
    this.closeTabService.saveDataForReadingConfig = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.ReadingConfigALL);
    this.zoneDictionary = await this.readManagerService.dictionaryWrapperService.getZoneDictionary();
    this.insertToAuxZoneid();

    Converter.convertIdToTitle(this.closeTabService.saveDataForReadingConfig, this.zoneDictionary, 'dynamicId');
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForReadingConfig)) {
      this.callAPI();
    }
  }
  removeRow = async (rowData: object) => {
    const a = await this.readManagerService.firstConfirmDialog('ناحیه: ' + rowData['dataSource'].dynamicId);
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.ReadingConfigREMOVE, rowData['dataSource'].id);
      this.callAPI();
    }
  }

}
