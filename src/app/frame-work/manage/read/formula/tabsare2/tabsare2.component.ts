import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ITabsare2Formula } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { FormulasService } from 'services/formulas.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { Tabsare2AddDgComponent } from './tabsare2-add-dg/tabsare2-add-dg.component';

@Component({
  selector: 'app-tabsare2',
  templateUrl: './tabsare2.component.html',
  styleUrls: ['./tabsare2.component.scss']
})
export class Tabsare2Component extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: ITabsare2Formula; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public formulasService: FormulasService,
    private dialog: MatDialog
  ) {
    super();
  }

  /* TODO// show dialog box to add excel file*/
  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(Tabsare2AddDgComponent,
        {
          disableClose: true,
          minWidth: '65vw',
          data: {
            di: this.zoneDictionary
          }

        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForTabsare2Formula = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForTabsare2Formula) {
      this.closeTabService.saveDataForTabsare2Formula = await this.formulasService.ajaxReqWrapperService.getDataSource(ENInterfaces.FormulaTabsare2All);
    }
    this.zoneDictionary = await this.formulasService.dictionaryWrapperService.getZoneDictionary();

    Converter.convertIdToTitle(this.closeTabService.saveDataForTabsare2Formula, this.zoneDictionary, 'zoneId');
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForTabsare2Formula = this.closeTabService.saveDataForTabsare2Formula.slice(0, index).concat(this.closeTabService.saveDataForTabsare2Formula.slice(index + 1));
  private removeRow = async (rowData: string, rowIndex: number) => {
    await this.formulasService.postFormulaRemove(ENInterfaces.FormulaTabsare2Remove, rowData);
    this.refetchTable(rowIndex);
  }

  firstConfirmDialog = async (rowData: ITabsare2Formula) => {
    const a = await this.formulasService.firstConfirmDialog('ناحیه: ' + rowData['dataSource'].zoneId);
    if (a)
      this.removeRow(rowData['dataSource'].id, rowData['ri']);
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  async onRowEditSave(dataSource: ITabsare2Formula) {
    if (!this.formulasService.verificationEditedRowTabsare2(dataSource['dataSource'])) {
      this.closeTabService.saveDataForTabsare2Formula[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
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

    await this.formulasService.postFormulaEdit(ENInterfaces.FormulaTabsare2Edit, dataSource);
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
    Converter.convertIdToTitle(this.closeTabService.saveDataForTabsare2Formula, this.zoneDictionary, 'zoneId');
  }
  onRowEditCancel() { }

}
