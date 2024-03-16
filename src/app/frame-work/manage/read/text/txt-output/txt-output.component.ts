import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ITextOutput } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-txt-output',
  templateUrl: './txt-output.component.html',
  styleUrls: ['./txt-output.component.scss']
})
export class TxtOutputComponent extends FactoryONE {

  zoneDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: ITextOutput; } = {};
  newRowLimit: number = 1;

  constructor(
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) {
    super();
  }

  callAPI = async () => {
    this.closeTabService.saveDataForTextOutput = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.textOutputGET);
    this.zoneDictionary = await this.readManagerService.dictionaryWrapperService.getZoneDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForTextOutput, this.zoneDictionary, 'zoneId');
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForTextOutput)) {
      this.callAPI();
    }
  }
  removeRow = async (rowData: object) => {
    this.newRowLimit = 1;
    const a = await this.readManagerService.firstConfirmDialog('عنوان: ' + rowData['dataSource'].itemTitle + '،  ناحیه: ' + rowData['dataSource'].zoneId);
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.textOutputRemove, rowData['dataSource'].id);
      this.callAPI();
    }
  }
  onRowEditInit(dataSource: object) {
    // this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: ITextOutput) => {
    this.newRowLimit = 1;
    if (!this.readManagerService.verification(dataSource)) {
      this.closeTabService.saveDataForTextOutput[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (typeof dataSource['dataSource'].zoneId !== 'object') {
      this.zoneDictionary.find(item => {
        if (item.title === dataSource['dataSource'].zoneId)
          dataSource['dataSource'].zoneId = item.id
      })
    } else {
      dataSource['dataSource'].zoneId = dataSource['dataSource'].zoneId['id'];
    }

    if (dataSource['dataSource'].isNew) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.textOutputEdit, dataSource['dataSource']);
    }
    Converter.convertIdToTitle(this.closeTabService.saveDataForTextOutput, this.zoneDictionary, 'zoneId');
  }
  onRowEditCancel(dataSource: object) {
    this.newRowLimit = 1;
    this.closeTabService.saveDataForTextOutput[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    Converter.convertIdToTitle(this.closeTabService.saveDataForTextOutput, this.zoneDictionary, 'zoneId');
    delete this.closeTabService.saveDataForTextOutput[dataSource['dataSource'].id];
    if (dataSource['dataSource'].isNew)
      this.closeTabService.saveDataForTextOutput.shift();
    return;
  }
  newRow(): ITextOutput {
    return {
      zoneId: null,
      itemTitle: '',
      startIndex: null,
      endIndex: null,
      length: null,
      isNew: true
    };
  }
  testChangedValue() {
    this.newRowLimit = 2;
  }
  private async onRowAdd(dataSource: ITextOutput, rowIndex: number) {
    const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.textOutputAdd, dataSource);
    if (a) {
      this.callAPI();
    }
  }

}