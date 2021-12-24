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

  dataSource: IImageAttribution[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  clonedProducts: { [s: string]: IImageAttribution; } = {};

  constructor(
    private closeTabService: CloseTabService,
    public readManagerService: ReadManagerService,
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForImageAttribution = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.readManagerService.getDataSource(ENInterfaces.imageAttributionGet);
    console.log(this.dataSource);

    this.closeTabService.saveDataForImageAttribution = this.dataSource;
    this.defaultAddStatus();
    // this.insertSelectedColumns();
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  // insertSelectedColumns = () => {

  //   this._selectCols = [{ field: 'title', header: 'عنوان', isSelected: true }];
  //   this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  // }
  testChangedValue() {
    this.newRowLimit = 2;
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
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
    this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    delete this.dataSource[dataSource['dataSource'].id];
    if (dataSource['dataSource'].isNew)
      this.dataSource.shift();
    return;
  }
  removeRow = async (dataSource: IImageAttribution) => {
    this.newRowLimit = 1;

    if (!this.readManagerService.verificationImageAttribution(dataSource['dataSource']))
      return;
    const confirmed = await this.readManagerService.firstConfirmDialog();
    if (!confirmed) return;
    console.log(dataSource['dataSource']);
    const a = await this.readManagerService.deleteSingleRowByObject(ENInterfaces.imageAttributionRemove, dataSource['dataSource']);

    if (a) {
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      delete this.dataSource[dataSource['dataSource'].id];
      this.refetchTable(dataSource['ri']);
    }
  }
  onRowEditSave(dataSource: object) {
    this.newRowLimit = 1;
    if (!this.readManagerService.verificationImageAttribution(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.dataSource.shift();
        return;
      }
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].fragmentMasterId];
      return;
    }
    if (!dataSource['dataSource'].id) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      this.readManagerService.addOrEditAuths(ENInterfaces.imageAttributionEdit, dataSource['dataSource']);
    }
  }
  private async onRowAdd(dataSource: IImageAttribution, rowIndex: number) {
    const a = await this.readManagerService.addOrEditAuths(ENInterfaces.imageAttributionAdd, dataSource);
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