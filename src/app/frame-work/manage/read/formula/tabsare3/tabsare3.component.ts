import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IAbBahaFormula } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { FormulasService } from 'services/formulas.service';
import { OutputManagerService } from 'services/output-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { AddExcelFileComponent } from '../add-excel-file/add-excel-file.component';
import { Tabsare3AddDgComponent } from './tabsare3-add-dg/tabsare3-add-dg.component';

@Component({
  selector: 'app-tabsare3',
  templateUrl: './tabsare3.component.html',
  styleUrls: ['./tabsare3.component.scss']
})
export class Tabsare3Component extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];
  karbariCodeDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IAbBahaFormula; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public formulasService: FormulasService,
    private dialog: MatDialog,
    public outputManagerService: OutputManagerService
  ) {
    super();
  }

  /* TODO// show dialog box to add excel file*/
  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(Tabsare3AddDgComponent,
        {
          disableClose: true,
          minWidth: '65vw',
          data: {
            di: this.zoneDictionary,
            karbariCodeDic: this.karbariCodeDictionary
          }

        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  openAddExcelDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(AddExcelFileComponent,
        {
          minWidth: '21rem',
        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.formulasService.postExcelFile(ENInterfaces.FormulaTabsare3AddExcel);
          this.refreshTable();
        }
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForTabsare3Formula = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForTabsare3Formula) {
      this.closeTabService.saveDataForTabsare3Formula = await this.formulasService.getFormulaAll(ENInterfaces.FormulaTabsare3All);
    }
    this.zoneDictionary = await this.formulasService.dictionaryWrapperService.getZoneDictionary();
    this.karbariCodeDictionary = await this.formulasService.dictionaryWrapperService.getkarbariCodeDictionary();

    this.toConvert();
  }
  toConvert = () => {
    this.closeTabService.saveDataForTabsare3Formula =
      Converter.convertIdsToTitles(
        this.closeTabService.saveDataForTabsare3Formula,
        {
          zoneDictionary: this.zoneDictionary,
          karbariCodeDictionary: this.karbariCodeDictionary,
        },
        {
          zoneId: 'zoneId',
          karbariMoshtarakinCode: 'karbariMoshtarakinCode',
        }
      )
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForTabsare3Formula = this.closeTabService.saveDataForTabsare3Formula.slice(0, index).concat(this.closeTabService.saveDataForTabsare3Formula.slice(index + 1));
  private removeRow = async (rowData: string, rowIndex: number) => {
    await this.formulasService.postFormulaRemove(ENInterfaces.FormulaTabsare3Remove, rowData);
    this.refetchTable(rowIndex);
  }

  firstConfirmDialog = async (rowData: IAbBahaFormula) => {
    const a = await this.formulasService.firstConfirmDialog('ناحیه: ' + rowData['dataSource'].zoneId + '،  کاربری مشترکین: ' + rowData['dataSource'].karbariMoshtarakinCode);
    if (a)
      this.removeRow(rowData['dataSource'].id, rowData['ri']);
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  async onRowEditSave(dataSource: IAbBahaFormula) {
    if (!this.formulasService.verificationEditedRow(dataSource['dataSource'])) {
      this.closeTabService.saveDataForTabsare3Formula[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
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
    if (typeof dataSource['dataSource'].karbariMoshtarakinCode !== 'object') {
      this.karbariCodeDictionary.find(item => {
        if (item.title === dataSource['dataSource'].karbariMoshtarakinCode)
          dataSource['dataSource'].karbariMoshtarakinCode = item.id
      })
    } else {
      dataSource['dataSource'].karbariMoshtarakinCode = dataSource['dataSource'].karbariMoshtarakinCode['id'];
    }

    await this.formulasService.postFormulaEdit(ENInterfaces.FormulaTabsare3Edit, dataSource['dataSource']);
    this.toConvert();
  }
  onRowEditCancel() { }
  getExcelSample = async () => {
    this.outputManagerService.saveAsExcelABuffer(await this.formulasService.getExcelSample(ENInterfaces.FormulaTabsare3ExcelSample), 'tabsare3Sample');
  }
}
