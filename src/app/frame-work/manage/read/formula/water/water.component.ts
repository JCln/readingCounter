import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IAbBahaFormula } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { FormulasService } from 'services/formulas.service';
import { InteractionService } from 'services/interaction.service';
import { OutputManagerService } from 'services/output-manager.service';
import { Converter } from 'src/app/classes/converter';

import { ConfirmTextDialogComponent } from '../../../tracking/confirm-text-dialog/confirm-text-dialog.component';
import { AddExcelFileComponent } from './../add-excel-file/add-excel-file.component';
import { WaterAddDgComponent } from './water-add-dg/water-add-dg.component';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss']
})
export class WaterComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: IAbBahaFormula[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  karbariCodeDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];
  clonedProducts: { [s: string]: IAbBahaFormula; } = {};

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public formulasService: FormulasService,
    private dialog: MatDialog,
    public outputManagerService: OutputManagerService
  ) {
  }

  /* TODO// show dialog box to add excel file*/
  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(WaterAddDgComponent,
        {
          disableClose: true,
          minWidth: '19rem',
          data: {
            di: this.zoneDictionary,
            karbariCodeDic: this.karbariCodeDictionary
          }

        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.formulasService.postFormulaAdd(ENInterfaces.FormulaWaterAdd, result);
          this.refreshTable();
        }
      });
    });
  }
  openAddExcelDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(AddExcelFileComponent,
        {
          minWidth: '19rem',
        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.formulasService.postExcelFile('postAbBahaFormulaAddExcel');
          this.refreshTable();
        }
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForWaterFormula = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForWaterFormula) {
      this.dataSource = this.closeTabService.saveDataForWaterFormula;
    }
    else {
      this.dataSource = await this.formulasService.getFormulaAll(ENInterfaces.FormulaWaterAll);
      this.closeTabService.saveDataForWaterFormula = this.dataSource;
    }
    this.zoneDictionary = await this.formulasService.getZoneDictionary();
    this.karbariCodeDictionary = await this.formulasService.getKarbariCodeDictionary();

    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.karbariCodeDictionary, 'karbariMoshtarakinCode');

    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.formulasService.columnAbFormulas();
    this._selectedColumns = this.formulasService.customizeSelectedColumns(this._selectCols);
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/r/formula/ab')
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  refreshTable = () => {
    this.classWrapper(true);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  private removeRow = async (rowData: IAbBahaFormula, rowIndex: number) => {
    await this.formulasService.postFormulaRemove(ENInterfaces.FormulaWaterRemove, rowData.id);
    this.refetchTable(rowIndex);
  }

  firstConfirmDialog = (rowData: object) => {
    const title = EN_messages.confirm_remove;
    return new Promise(() => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
        data: {
          title: title,
          isInput: false,
          isDelete: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.removeRow(rowData['dataSource'], rowData['ri']);
        }
      })
    })
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  async onRowEditSave(dataSource: object) {
    if (!this.formulasService.verificationEditedRow(dataSource['dataSource'])) {
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
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
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.karbariCodeDictionary, 'karbariMoshtarakinCode');
  }
  onRowEditCancel() { }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  getExcelSample = async () => {
    this.outputManagerService.saveAsExcelABuffer(await this.formulasService.getExcelSample(ENInterfaces.FormulaWaterExcelSample), 'waterSample');
  }
}
