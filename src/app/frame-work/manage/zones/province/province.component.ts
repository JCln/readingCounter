import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IProvinceManager } from 'src/app/Interfaces/inon-manage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { SectorsManagerService } from 'src/app/services/sectors-manager.service';

import { ProvinceAddDgComponent } from './province-add-dg/province-add-dg.component';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: IProvinceManager[] = [];
  editableDataSource = [];

  subscription: Subscription[] = [];
  countryDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];
  clonedProducts: { [s: string]: IProvinceManager; } = {};

  constructor(
    private dialog: MatDialog,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private sectorsManagerService: SectorsManagerService
  ) { }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(ProvinceAddDgComponent,
        {
          disableClose: true,
          width: '30rem',
          data: {
            di: this.countryDictionary
          }

        });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sectorsManagerService.sectorsAddEdit(ENInterfaces.ProvinceADD, result);
        }
      });
    });
  }
  getEditableSource = (row: any) => {
    const a = this.editableDataSource.find(dataSource => {
      if (dataSource.id == row.id) {
        return dataSource.id;
      }
    })
    return a;
  }
  nullSavedSource = () => this.closeTabService.saveDataForProvince = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForProvince) {
      this.dataSource = this.closeTabService.saveDataForProvince;
    }
    else {
      this.dataSource = await this.sectorsManagerService.getProvinceDataSource();
      this.closeTabService.saveDataForProvince = this.dataSource;
    }
    this.countryDictionary = await this.sectorsManagerService.getCountryDictionary();
    this.editableDataSource = JSON.parse(JSON.stringify(this.dataSource));

    this.sectorsManagerService.convertIdToTitle(this.dataSource, this.countryDictionary, 'countryId');
    this.insertSelectedColumns();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/zs/p')
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
    this.subscription.forEach(subscription => subscription.unsubscribe())
  }
  insertSelectedColumns = () => {
    this._selectCols = this.sectorsManagerService.columnProvince();
    this._selectedColumns = this.sectorsManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: IProvinceManager, rowIndex: number) => {
    const a = await this.sectorsManagerService.firstConfirmDialog();
    if (a) {
      await this.sectorsManagerService.deleteSingleRow(ENInterfaces.ProvinceREMOVE, rowData.id);
      this.refetchTable(rowIndex);
    }
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditSave = async (dataSource: IProvinceManager, rowIndex: number) => {
    if (!this.sectorsManagerService.verificationEditedRow(dataSource)) {
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }
    if (typeof dataSource.countryId !== 'object') {
      this.countryDictionary.find(item => {
        if (item.title === dataSource.countryId)
          dataSource.countryId = item.id
      })
    } else {
      dataSource.countryId = dataSource.countryId['id'];
    }

    await this.sectorsManagerService.addOrEditCountry(ENInterfaces.ProvinceEDIT, dataSource);
    this.sectorsManagerService.convertIdToTitle(this.dataSource, this.countryDictionary, 'countryId');
  }
  onRowEditCancel(dataSource: IProvinceManager, index: number) {
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
