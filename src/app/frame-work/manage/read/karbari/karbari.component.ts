import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IKarbari } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';

import { KarbariAddDgComponent } from './karbari-add-dg/karbari-add-dg.component';

@Component({
  selector: 'app-karbari',
  templateUrl: './karbari.component.html',
  styleUrls: ['./karbari.component.scss']
})
export class KarbariComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource: IKarbari[] = [];
  subscription: Subscription[] = [];

  provinceDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IKarbari; } = {};

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private dialog: MatDialog,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) { }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(KarbariAddDgComponent, {
        disableClose: true,
        minWidth: '19rem',
        data: {
          di: this.provinceDictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.readManagerService.addOrEditAuths(ENInterfaces.KarbariAdd, result);
        }
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForKarbari = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForKarbari) {
      this.dataSource = this.closeTabService.saveDataForKarbari;
    }
    else {
      this.dataSource = await this.readManagerService.getDataSource(ENInterfaces.KarbariAll);
      this.closeTabService.saveDataForKarbari = this.dataSource;
    }
    this.provinceDictionary = await this.readManagerService.getProvinceDictionary();

    Converter.convertIdToTitle(this.dataSource, this.provinceDictionary, 'provinceId');
    this.insertSelectedColumns();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/r/kar')
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
  insertSelectedColumns = () => {
    this._selectCols = this.readManagerService.columnKarbari();
    this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: object) => {
    const a = await this.readManagerService.firstConfirmDialog();
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.KarbariRemove, rowData['dataSource']);
      this.refetchTable(rowData['ri']);
    }
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: IKarbari) => {
    if (!this.readManagerService.verification(dataSource)) {
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
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
    await this.readManagerService.addOrEditAuths(ENInterfaces.KarbariEdit, dataSource['dataSource']);
    Converter.convertIdToTitle(this.dataSource, this.provinceDictionary, 'provinceId');
  }
  refreshTable = () => {
    this.classWrapper(true);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}