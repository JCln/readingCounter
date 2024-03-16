import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IRegionManager } from 'interfaces/izones';
import { CloseTabService } from 'services/close-tab.service';
import { SectorsManagerService } from 'services/sectors-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { RegionAddDgComponent } from './region-add-dg/region-add-dg.component';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent extends FactoryONE {
  provinceDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IRegionManager; } = {};

  constructor(
    private dialog: MatDialog,
    public closeTabService: CloseTabService,
    private sectorsManagerService: SectorsManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(RegionAddDgComponent,
        {
          disableClose: true,
          minWidth: '65vw',
          data: {
            di: this.provinceDictionary
          }

        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.callAPI();
      });
    });
  }
  callAPI = async () => {
    this.closeTabService.saveDataForRegion = await this.sectorsManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.RegionGET);
    this.provinceDictionary = await this.sectorsManagerService.dictionaryWrapperService.getProvinceDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForRegion, this.provinceDictionary, 'provinceId');
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForRegion)) {
      this.callAPI();
    }
  }
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.sectorsManagerService.firstConfirmDialog('عنوان: ' + rowDataAndIndex['dataSource'].title + '،  استان: ' + rowDataAndIndex['dataSource'].provinceId);

    if (a) {
      await this.sectorsManagerService.postByIdSuccessBool(ENInterfaces.RegionREMOVE, rowDataAndIndex['dataSource'].id);
      this.callAPI();
    }
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.sectorsManagerService.verification(dataSource['dataSource'])) {
      this.closeTabService.saveDataForRegion[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (typeof dataSource['dataSource'].provinceId !== 'object') {
      this.provinceDictionary.find(item => {
        if (item.title === dataSource['dataSource'].provinceId)
          dataSource['dataSource'].provinceId = item.id
      })
    } else {
      dataSource['dataSource'].provinceId = dataSource['dataSource'].provinceId['id'];
    }

    const res = await this.sectorsManagerService.postObjectBySuccessMessage(ENInterfaces.RegionEDIT, dataSource['dataSource']);
    if (res) {
      this.callAPI();
      Converter.convertIdToTitle(this.closeTabService.saveDataForRegion, this.provinceDictionary, 'provinceId');
    }
  }
  onRowEditCancel() {
    // this.closeTabService.saveDataForRegion[rowDataAndIndex['ri']] = this.clonedProducts[rowDataAndIndex['dataSource']];
    // delete this.closeTabService.saveDataForRegion[rowDataAndIndex['dataSource']];
    // return;
  }

}

