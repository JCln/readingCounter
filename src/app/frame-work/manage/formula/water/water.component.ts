import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { EN_messages } from 'src/app/Interfaces/enums.enum';
import { IAbBahaFormula } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { FormulasService } from 'src/app/services/formulas.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';

import { ConfirmTextDialogComponent } from '../../tracking/confirm-text-dialog/confirm-text-dialog.component';
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
    private formulasService: FormulasService,
    private dialog: MatDialog,
    public outputManagerService: OutputManagerService
  ) {
  }

  /* TODO// show dialog box to add excel file*/
  openAddDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(WaterAddDgComponent,
        {
          disableClose: true,
          width: '30rem',
          data: {
            di: this.zoneDictionary,
            karbariCodeDic: this.karbariCodeDictionary
          }

        });
      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.formulasService.postAbBahaFormulaAdd(result);
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
          console.log(result);
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForWaterFormula = null;
  convertKarbariCodeToTitle = (dataSource: any, zoneDictionary: IDictionaryManager[]) => {
    dataSource.map(dataSource => {
      zoneDictionary.map(zoneDic => {
        if (zoneDic.id === dataSource.karbariMoshtarakinCode)
          dataSource.karbariMoshtarakinCode = zoneDic.title;
      })
    });
  }
  convertZoneIdToTitle = (dataSource: any, zoneDictionary: IDictionaryManager[]) => {
    dataSource.map(dataSource => {
      zoneDictionary.map(zoneDic => {
        if (zoneDic.id === dataSource.zoneId)
          dataSource.zoneId = zoneDic.title;
      })
    });
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForWaterFormula) {
      this.dataSource = this.closeTabService.saveDataForWaterFormula;
    }
    else {
      this.dataSource = await this.formulasService.getAbBahaFormulaAll();
      this.closeTabService.saveDataForWaterFormula = this.dataSource;
    }
    this.zoneDictionary = await this.formulasService.getZoneDictionary();
    this.karbariCodeDictionary = await this.formulasService.getKarbariCodeDictionary();

    this.convertZoneIdToTitle(this.dataSource, this.zoneDictionary);
    this.convertKarbariCodeToTitle(this.dataSource, this.karbariCodeDictionary);

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
    this._selectCols = this.formulasService.columnAbFormulas();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/formula/ab')
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
    await this.formulasService.postAbBahaFormulaRemove(rowData.id);
    this.refetchTable(rowIndex);
  }

  firstConfirmDialog = (rowData: IAbBahaFormula, rowIndex: number) => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        data: EN_messages.delete_confirm
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.removeRow(rowData, rowIndex)
        }
      })
    })
  }
  onRowEditInit(dataSource: IAbBahaFormula, rowIndex: number) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
    // this.clonedProducts[dataSource.id[rowIndex]] = { ...dataSource }; // for test perpuse
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

    await this.formulasService.postAbBahaFormulaEdit(dataSource);
  }
  onRowEditCancel(dataSource: IAbBahaFormula, index: number) {
    // this.dataSource[index] = this.clonedProducts[dataSource.id];
    // delete this.dataSource[dataSource.id];
    // return;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}
