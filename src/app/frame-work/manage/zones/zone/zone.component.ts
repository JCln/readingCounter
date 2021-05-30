import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IZoneManager } from 'src/app/Interfaces/inon-manage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { SectorsManagerService } from 'src/app/services/sectors-manager.service';

import { ZoneAddDgComponent } from './zone-add-dg/zone-add-dg.component';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: IZoneManager[] = [];
  editableDataSource = [];

  subscription: Subscription[] = [];
  regionDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];
  clonedProducts: { [s: string]: IZoneManager; } = {};

  constructor(
    private dialog: MatDialog,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private sectorsManagerService: SectorsManagerService
  ) { }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(ZoneAddDgComponent,
        {
          disableClose: true,
          width: '30rem',
          data: {
            di: this.regionDictionary
          }

        });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sectorsManagerService.sectorsAddEdit(ENInterfaces.ZoneADD, result);
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
  nullSavedSource = () => this.closeTabService.saveDataForZone = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForZone) {
      this.dataSource = this.closeTabService.saveDataForZone;
    }
    else {
      this.dataSource = await this.sectorsManagerService.getZoneDataSource();
      this.closeTabService.saveDataForZone = this.dataSource;
    }
    this.regionDictionary = await this.sectorsManagerService.getRegionDictionary();
    this.editableDataSource = JSON.parse(JSON.stringify(this.dataSource));

    this.sectorsManagerService.convertIdToTitle(this.dataSource, this.regionDictionary, 'regionId');
    this.insertSelectedColumns();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/zs/z')
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
    this._selectCols = this.sectorsManagerService.columnZone();
    this._selectedColumns = this.sectorsManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: IZoneManager, rowIndex: number) => {
    const a = await this.sectorsManagerService.firstConfirmDialog();

    if (a) {
      await this.sectorsManagerService.deleteSingleRow(ENInterfaces.ZoneREMOVE, rowData.id);
      this.refetchTable(rowIndex);
    }
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditSave = async (dataSource: IZoneManager, rowIndex: number) => {
    if (!this.sectorsManagerService.verification(dataSource)) {
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }
    if (typeof dataSource.regionId !== 'object') {
      this.regionDictionary.find(item => {
        if (item.title === dataSource.regionId)
          dataSource.regionId = item.id
      })
    } else {
      dataSource.regionId = dataSource.regionId['id'];
    }
    await this.sectorsManagerService.addOrEditCountry(ENInterfaces.ZoneEDIT, dataSource);
    this.sectorsManagerService.convertIdToTitle(this.dataSource, this.regionDictionary, 'regionId');
  }
  onRowEditCancel(dataSource: IZoneManager, index: number) {
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

