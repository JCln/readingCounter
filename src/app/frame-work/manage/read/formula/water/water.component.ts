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

import { AddExcelFileComponent } from './../add-excel-file/add-excel-file.component';
import { WaterAddDgComponent } from './water-add-dg/water-add-dg.component';
import { WaterBatchAddDgComponent } from './water-batch-add-dg/water-batch-add-dg.component';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss']
})
export class WaterComponent extends FactoryONE {
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
      const dialogRef = this.dialog.open(WaterAddDgComponent,
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
          minWidth: '65vw',
        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.formulasService.postExcelFile(ENInterfaces.FormulaWaterAddExcel);
          this.refreshTable();
        }
      });
    });
  }
  openBatchAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(WaterBatchAddDgComponent,
        {
          minWidth: '70%',
          direction: 'rtl',
        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForWaterFormula = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForWaterFormula) {
      this.closeTabService.saveDataForWaterFormula = await this.formulasService.getFormulaAll(ENInterfaces.FormulaWaterAll);
    }
    this.zoneDictionary = await this.formulasService.getZoneDictionary();
    this.karbariCodeDictionary = await this.formulasService.getKarbariCodeDictionary();

    this.toConvert();
  }
  toConvert = () => {
    this.closeTabService.saveDataForWaterFormula =
      Converter.convertIdsToTitles(
        this.closeTabService.saveDataForWaterFormula,
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
  refetchTable = (index: number) => this.closeTabService.saveDataForWaterFormula = this.closeTabService.saveDataForWaterFormula.slice(0, index).concat(this.closeTabService.saveDataForWaterFormula.slice(index + 1));
  private removeRow = async (rowData: string, rowIndex: number) => {
    await this.formulasService.postFormulaRemove(ENInterfaces.FormulaWaterRemove, rowData);
    this.refetchTable(rowIndex);
  }

  firstConfirmDialog = async (rowData: object) => {
    const a = await this.formulasService.firstConfirmDialog();
    if (a)
      this.removeRow(rowData['dataSource'], rowData['ri']);
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  async onRowEditSave(dataSource: object) {
    if (!this.formulasService.verificationEditedRow(dataSource['dataSource'])) {
      this.closeTabService.saveDataForWaterFormula[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
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

    await this.formulasService.postFormulaEdit(ENInterfaces.FormulaWaterEdit, dataSource['dataSource']);
    this.toConvert();
  }
  onRowEditCancel() { }
  getExcelSample = async () => {
    this.outputManagerService.saveAsExcelABuffer(await this.formulasService.getExcelSample(ENInterfaces.FormulaWaterExcelSample), 'waterSample');
  }
}
