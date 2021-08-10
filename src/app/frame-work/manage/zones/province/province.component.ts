import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IProvinceManager } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { SectorsManagerService } from 'services/sectors-manager.service';
import { Converter } from 'src/app/classes/converter';

import { ProvinceAddDgComponent } from './province-add-dg/province-add-dg.component';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: IProvinceManager[] = [];

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
          minWidth: '19rem',
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
  nullSavedSource = () => this.closeTabService.saveDataForProvince = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForProvince) {
      this.dataSource = this.closeTabService.saveDataForProvince;
    }
    else {
      this.dataSource = await this.sectorsManagerService.getSectorsDataSource(ENInterfaces.ProvinceGET);
      this.closeTabService.saveDataForProvince = this.dataSource;
    }
    this.countryDictionary = await this.sectorsManagerService.getCountryDictionary();

    Converter.convertIdToTitle(this.dataSource, this.countryDictionary, 'countryId');
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
  removeRow = async (rowData: object) => {
    const a = await this.sectorsManagerService.firstConfirmDialog();
    if (a) {
      await this.sectorsManagerService.deleteSingleRow(ENInterfaces.ProvinceREMOVE, rowData['dataSource']);
      this.refetchTable(rowData['ri']);
    }
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.sectorsManagerService.verification(dataSource['dataSource'])) {
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (typeof dataSource['dataSource'].countryId !== 'object') {
      this.countryDictionary.find(item => {
        if (item.title === dataSource['dataSource'].countryId)
          dataSource['dataSource'].countryId = item.id
      })
    } else {
      dataSource['dataSource'].countryId = dataSource['dataSource'].countryId['id'];
    }

    await this.sectorsManagerService.addOrEditCountry(ENInterfaces.ProvinceEDIT, dataSource['dataSource']);
    Converter.convertIdToTitle(this.dataSource, this.countryDictionary, 'countryId');
  }
  onRowEditCancel() {
    // this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    // delete this.dataSource[dataSource['dataSource'].id];
    // return;
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
