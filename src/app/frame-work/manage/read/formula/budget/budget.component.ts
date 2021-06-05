import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { EN_messages } from 'src/app/Interfaces/enums.enum';
import { IAbBahaFormula } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { FormulasService } from 'src/app/services/formulas.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';

import { ConfirmTextDialogComponent } from '../../../tracking/confirm-text-dialog/confirm-text-dialog.component';
import { AddExcelFileComponent } from '../add-excel-file/add-excel-file.component';
import { BudgetAddDgComponent } from './budget-add-dg/budget-add-dg.component';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit, AfterViewInit, OnDestroy {
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
      const dialogRef = this.dialog.open(BudgetAddDgComponent,
        {
          disableClose: true,
          width: '30rem',
          data: {
            di: this.zoneDictionary,
            karbariCodeDic: this.karbariCodeDictionary
          }

        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          await this.formulasService.postFormulaAdd(ENInterfaces.FormulaBudgetAdd, result);
      });
    });
  }
  openAddExcelDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(AddExcelFileComponent,
        {
          width: '30rem'
        });
      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.formulasService.postExcelFile('postBudgetFormulaAddExcel')
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForBadgetFormula = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForBadgetFormula) {
      this.dataSource = this.closeTabService.saveDataForBadgetFormula;
    }
    else {
      this.dataSource = await this.formulasService.getFormulaAll(ENInterfaces.FormulaBudgetAll);
      this.closeTabService.saveDataForBadgetFormula = this.dataSource;
    }
    this.zoneDictionary = await this.formulasService.getZoneDictionary();
    this.karbariCodeDictionary = await this.formulasService.getKarbariCodeDictionary();

    this.formulasService.convertIdToTitle(this.dataSource, this.karbariCodeDictionary, 'karbariMoshtarakinCode');
    this.formulasService.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');

    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  insertSelectedColumns = () => {
    this._selectCols = this.formulasService.columnBudgetFormulas();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/r/formula/budget')
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
    await this.formulasService.postFormulaRemove(ENInterfaces.FormulaBudgetRemove, rowData.id);
    this.refetchTable(rowIndex);
  }

  firstConfirmDialog = (rowData: IAbBahaFormula, rowIndex: number) => {
    const title = EN_messages.delete_confirm;
    return new Promise(() => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        data: {
          title: title,
          isInput: false,
          isDelete: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.removeRow(rowData, rowIndex)
        }
      })
    })
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  async onRowEditSave(dataSource: IAbBahaFormula, rowIndex: number) {
    if (!this.formulasService.verificationEditedRow(dataSource)) {
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }
    if (typeof dataSource.zoneId !== 'object') {
      this.zoneDictionary.find(item => {
        if (item.title === dataSource.zoneId)
          dataSource.zoneId = item.id
      })
    } else {
      dataSource.zoneId = dataSource.zoneId['id'];
    }
    if (typeof dataSource.karbariMoshtarakinCode !== 'object') {
      this.karbariCodeDictionary.find(item => {
        if (item.title === dataSource.karbariMoshtarakinCode)
          dataSource.karbariMoshtarakinCode = item.id
      })
    } else {
      dataSource.karbariMoshtarakinCode = dataSource.karbariMoshtarakinCode['id'];
    }

    await this.formulasService.postFormulaEdit(ENInterfaces.FormulaBudgetEdit, dataSource);
  }
  onRowEditCancel(dataSource: IAbBahaFormula, index: number) {
    this.dataSource[index] = this.clonedProducts[dataSource.id];
    delete this.dataSource[dataSource.id];
    return;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  getExcelSample = async () => {
    this.outputManagerService.saveAsExcelABuffer(await this.formulasService.getExcelSample(ENInterfaces.FormulaBudgetExcelSample));
  }
}
