import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ICountryManager } from 'interfaces/inon-manage';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { SectorsManagerService } from 'services/sectors-manager.service';

import { CountryAddDgComponent } from './country-add-dg/country-add-dg.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource: ICountryManager[] = [];
  subscription: Subscription[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];
  clonedProducts: { [s: string]: ICountryManager; } = {};

  constructor(
    private dialog: MatDialog,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private sectorsManagerService: SectorsManagerService
  ) { }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(CountryAddDgComponent, { disableClose: true, minWidth: '19rem' });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.sectorsManagerService.addOrEditCountry(ENInterfaces.CountryADD, result);
        }
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForCountry = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForCountry) {
      this.dataSource = this.closeTabService.saveDataForCountry;
    }
    else {
      this.dataSource = await this.sectorsManagerService.getSectorsDataSource(ENInterfaces.CountryGET);
      this.closeTabService.saveDataForCountry = this.dataSource;
    }
    this.insertSelectedColumns();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/zs/c')
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
    this._selectCols = this.sectorsManagerService.columnCountry();
    this._selectedColumns = this.sectorsManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: ICountryManager, rowIndex: number) => {
    const a = await this.sectorsManagerService.firstConfirmDialog();
    if (a) {
      await this.sectorsManagerService.deleteSingleRow(ENInterfaces.CountryREMOVE, rowData.id);
      this.refetchTable(rowIndex);
    }
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditSave = async (dataSource: ICountryManager, rowIndex: number) => {
    if (!this.sectorsManagerService.verification(dataSource)) {
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }
    await this.sectorsManagerService.addOrEditCountry(ENInterfaces.CountryEDIT, dataSource);
  }
  onRowEditCancel(dataSource: ICountryManager, index: number) {
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
  refreshTable = () => {
    this.classWrapper(true);
  }
}