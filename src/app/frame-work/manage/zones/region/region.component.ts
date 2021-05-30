import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IRegionManager } from 'src/app/Interfaces/inon-manage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { SectorsManagerService } from 'src/app/services/sectors-manager.service';

import { RegionAddDgComponent } from './region-add-dg/region-add-dg.component';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: IRegionManager[] = [];
  editableDataSource = [];

  subscription: Subscription[] = [];
  provinceDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];
  clonedProducts: { [s: string]: IRegionManager; } = {};

  constructor(
    private dialog: MatDialog,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private sectorsManagerService: SectorsManagerService
  ) { }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(RegionAddDgComponent,
        {
          disableClose: true,
          width: '30rem',
          data: {
            di: this.provinceDictionary
          }

        });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sectorsManagerService.sectorsAddEdit(ENInterfaces.RegionADD, result);
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
  nullSavedSource = () => this.closeTabService.saveDataForRegion = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForRegion) {
      this.dataSource = this.closeTabService.saveDataForRegion;
    }
    else {
      this.dataSource = await this.sectorsManagerService.getRegionDataSource();
      this.closeTabService.saveDataForRegion = this.dataSource;
    }
    this.provinceDictionary = await this.sectorsManagerService.getProvinceDictionary();
    this.editableDataSource = JSON.parse(JSON.stringify(this.dataSource));

    this.sectorsManagerService.convertIdToTitle(this.dataSource, this.provinceDictionary, 'provinceId');
    this.insertSelectedColumns();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/zs/r')
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
    this._selectCols = this.sectorsManagerService.columnRegion();
    this._selectedColumns = this.sectorsManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: IRegionManager, rowIndex: number) => {
    const a = await this.sectorsManagerService.firstConfirmDialog();

    if (a) {
      await this.sectorsManagerService.deleteSingleRow(ENInterfaces.RegionREMOVE, rowData.id);
      this.refetchTable(rowIndex);
    }
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditSave = async (dataSource: IRegionManager, rowIndex: number) => {
    if (!this.sectorsManagerService.verificationEditedRow(dataSource)) {
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }
    if (typeof dataSource.provinceId !== 'object') {
      this.provinceDictionary.find(item => {
        if (item.title === dataSource.provinceId)
          dataSource.provinceId = item.id
      })
    } else {
      dataSource.provinceId = dataSource.provinceId['id'];
    }

    await this.sectorsManagerService.addOrEditCountry(ENInterfaces.ProvinceEDIT, dataSource);
    this.sectorsManagerService.convertIdToTitle(this.dataSource, this.provinceDictionary, 'provinceId');
  }
  onRowEditCancel(dataSource: IRegionManager, index: number) {
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

