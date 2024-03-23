import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDynamicTraverse } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-dynamic-traverse',
  templateUrl: './dynamic-traverse.component.html',
  styleUrls: ['./dynamic-traverse.component.scss']
})
export class DynamicTraverseComponent extends FactoryONE {
  newRowLimit: number = 1;

  readonly dynamicTraverseColumns: string = 'dynamicTraverse';

  clonedProducts: { [s: string]: IDynamicTraverse; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService,
  ) {
    super();
  }

  callAPI = async() => {
    this.closeTabService.saveDataForDynamicTraverse = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.dynamicTraverseAll);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForDynamicTraverse)) {
      this.callAPI();
    }
    this.defaultAddStatus();  
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  testChangedValue() {
    this.newRowLimit = 2;
  }
  newRow(): IDynamicTraverse {
    return {
      id: 0,
      title: '',
      storageTitle: '',
      isChangeable: false,
      defaultValue: false,
      isActive: true,
      isNew: true
    };
  }
  onRowEditInit(dataSource: IDynamicTraverse) {
    // this.insertSelectedColumns();
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditCancel(dataSource: object) {
    this.newRowLimit = 1;
    this.closeTabService.saveDataForDynamicTraverse[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    delete this.closeTabService.saveDataForDynamicTraverse[dataSource['dataSource'].id];
    if (dataSource['dataSource'].isNew)
      this.closeTabService.saveDataForDynamicTraverse.shift();
  }
  removeRow = async (dataSource: IDynamicTraverse) => {
    this.newRowLimit = 1;

    if (!this.readManagerService.verificationDynamicTraverse(dataSource['dataSource']))
      return;

    const confirmed = await this.readManagerService.firstConfirmDialog('عنوان: ' + dataSource['dataSource'].title);
    if (!confirmed) return;
    const route = ENInterfaces.dynamicTraverseRemove;
    if (await this.readManagerService.postObjectWithSuccessMessage(route, dataSource['dataSource']))
      this.callAPI();
  }
  async onRowEditSave(dataSource: object) {
    this.newRowLimit = 1;
    if (!this.readManagerService.verificationDynamicTraverse(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.saveDataForDynamicTraverse.shift();
        return;
      }
      this.closeTabService.saveDataForDynamicTraverse[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (!dataSource['dataSource'].id) {
      this.onRowAdd(dataSource['dataSource']);
    }
    else {
      const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.dynamicTraverseEdit, dataSource['dataSource']);
      if (a) {
        this.callAPI();
      }
    }
  }
  private async onRowAdd(dataSource: IDynamicTraverse) {
    const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.dynamicTraverseAdd, dataSource);
    if (a) {
      this.callAPI();
    }
  }  

}
