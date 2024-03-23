import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IGuild } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss']
})
export class GuildComponent extends FactoryONE {
  newRowLimit: number = 1;

  readonly guildColumns: string = 'guild';
  clonedProducts: { [s: string]: IGuild; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService,
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.saveDataForGuild = await this.readManagerService.dictionaryWrapperService.getGuildDictionary(true);
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  testChangedValue() {
    this.newRowLimit = 2;
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForGuild)) {
      this.callAPI();
    }
    this.defaultAddStatus();
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForGuild = this.closeTabService.saveDataForGuild.slice(0, index).concat(this.closeTabService.saveDataForGuild.slice(index + 1));
  newRow(): IGuild {
    return {
      id: 0,
      title: '',
      moshtarakinId: null,
      isNew: true
    };
  }
  onRowEditInit(dataSource: IGuild) {
    // this.insertSelectedColumns();
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditCancel(dataSource: object) {
    this.newRowLimit = 1;
    this.closeTabService.saveDataForGuild[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    delete this.closeTabService.saveDataForGuild[dataSource['dataSource'].id];
    if (dataSource['dataSource'].isNew)
      this.closeTabService.saveDataForGuild.shift();
  }
  removeRow = async (dataSource: IGuild) => {
    this.newRowLimit = 1;

    if (!this.readManagerService.verificationGuild(dataSource['dataSource']))
      return;

    const confirmed = await this.readManagerService.firstConfirmDialog('عنوان: ' + dataSource['dataSource'].title);
    if (!confirmed) return;

    const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.GuildManagerRemove, dataSource['dataSource']);

    if (a) {
      this.closeTabService.saveDataForGuild[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      delete this.closeTabService.saveDataForGuild[dataSource['dataSource'].id];
      this.refetchTable(dataSource['ri']);
      this.callAPI();
    }
  }
  async onRowEditSave(dataSource: object) {
    this.newRowLimit = 1;
    if (!this.readManagerService.verificationGuild(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.saveDataForGuild.shift();
        return;
      }
      this.closeTabService.saveDataForGuild[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (!dataSource['dataSource'].id) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.GuildManagerEdit, dataSource['dataSource']);
      if (a) {
        this.callAPI();
      }
      else {
        this.refetchTable(dataSource['ri']);
      }
    }
  }
  private async onRowAdd(dataSource: IGuild, rowIndex: number) {
    const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.GuildManagerAdd, dataSource);
    if (a) {
      this.refetchTable(rowIndex);
      this.callAPI();
    }
  }

}
