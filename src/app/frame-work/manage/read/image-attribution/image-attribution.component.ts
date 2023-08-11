import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IImageAttribution } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-image-attribution',
  templateUrl: './image-attribution.component.html',
  styleUrls: ['./image-attribution.component.scss']
})
export class ImageAttributionComponent extends FactoryONE {
  newRowLimit: number = 1;

  _selectCols: any[] = [];
  _selectedColumns: any[];

  clonedProducts: { [s: string]: IImageAttribution; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService,
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForImageAttribution = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForImageAttribution) {
      this.closeTabService.saveDataForImageAttribution = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.imageAttributionGet);
    }
    this.defaultAddStatus();
    this.insertSelectedColumns();
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  insertSelectedColumns = () => {
    this._selectCols = [{ field: 'title', header: 'عنوان', isSelected: true }];
    this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  }
  testChangedValue() {
    this.newRowLimit = 2;
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForImageAttribution = this.closeTabService.saveDataForImageAttribution.slice(0, index).concat(this.closeTabService.saveDataForImageAttribution.slice(index + 1));
  newRow(): IImageAttribution {
    return {
      title: '',
      isNew: true
    };
  }
  onRowEditInit(dataSource: IImageAttribution) {
    // this.insertSelectedColumns();
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditCancel(dataSource: object) {
    this.newRowLimit = 1;
    this.closeTabService.saveDataForImageAttribution[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    delete this.closeTabService.saveDataForImageAttribution[dataSource['dataSource'].id];
    if (dataSource['dataSource'].isNew)
      this.closeTabService.saveDataForImageAttribution.shift();
    return;
  }
  removeRow = async (dataSource: IImageAttribution) => {
    this.newRowLimit = 1;

    if (!this.readManagerService.verificationImageAttribution(dataSource['dataSource']))
      return;
    const text = 'عنوان: ' + dataSource['dataSource'].title;
    const confirmed = await this.readManagerService.firstConfirmDialog(text);
    if (!confirmed) return;

    const a = await this.readManagerService.postObjectWithSuccessMessageBol(ENInterfaces.imageAttributionRemove, dataSource['dataSource']);

    if (a) {
      this.closeTabService.saveDataForImageAttribution[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      delete this.closeTabService.saveDataForImageAttribution[dataSource['dataSource'].id];
      this.refetchTable(dataSource['ri']);
    }
  }
  async onRowEditSave(dataSource: object) {
    this.newRowLimit = 1;
    if (!this.readManagerService.verificationImageAttribution(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.saveDataForImageAttribution.shift();
        return;
      }
      this.closeTabService.saveDataForImageAttribution[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].fragmentMasterId];
      return;
    }
    if (!dataSource['dataSource'].id) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.imageAttributionEdit, dataSource['dataSource']);
      if (a) {
        this.refreshTable();
      }
    }
  }
  private async onRowAdd(dataSource: IImageAttribution, rowIndex: number) {
    const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.imageAttributionAdd, dataSource);
    if (a) {
      this.refetchTable(rowIndex);
      this.refreshTable();
    }
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}