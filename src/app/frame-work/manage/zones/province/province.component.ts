import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IProvinceManager } from 'src/app/Interfaces/inon-manage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { SectorsManagerService } from 'src/app/services/sectors-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { ProvinceAddDgComponent } from './province-add-dg/province-add-dg.component';
import { ProvinceEditDgComponent } from './province-edit-dg/province-edit-dg.component';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit, AfterViewInit, OnDestroy {
  titleFilter = new FormControl('');
  countryIdFilter = new FormControl('');
  logicalOrderFilter = new FormControl('');

  dataSource = new MatTableDataSource();
  editableDataSource = [];

  subscription: Subscription[] = [];
  countryDictionary: IDictionaryManager[] = [];
  columnsToDisplay = ['title', 'countryId', 'logicalOrder', 'actions'];
  filterValues = {
    title: '',
    countryId: '',
    logicalOrder: ''
  };

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dialog: MatDialog,
    private snackWrapperService: SnackWrapperService,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private sectorsManagerService: SectorsManagerService
  ) { }

  openDialog = () => {
    return new Promise(resolve => {
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
          this.sectorsManagerService.sectorsAddEdit(ENInterfaces.ProvinceADD, result.value);
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
  editDialog = (row: any) => {
    const editable = this.getEditableSource(row).countryId;
    return new Promise(() => {
      const dialogRef = this.dialog.open(ProvinceEditDgComponent, {
        disableClose: true,
        width: '30rem',
        data: {
          row,
          editable,
          di: this.countryDictionary
        }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sectorsManagerService.sectorsAddEdit(ENInterfaces.ProvinceEDIT, result.value);
        }
      });
    });
  }
  deleteDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(DeleteDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        resolve(result)
      });
    });
  }
  deleteSingleRow = async (row: IProvinceManager) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      this.sectorsManagerService.sectorsDelete(ENInterfaces.ProvinceREMOVE, row.id);
    }
  }
  filterSearchs = () => {
    this.dataSource.filterPredicate = this.createFilter();

    this.titleFilter.valueChanges
      .subscribe(
        title => {
          this.filterValues.title = title;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.countryIdFilter.valueChanges
      .subscribe(
        countryId => {
          this.filterValues.countryId = countryId;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.logicalOrderFilter.valueChanges
      .subscribe(
        logicalOrder => {
          this.filterValues.logicalOrder = logicalOrder;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  nullSavedSource = () => this.closeTabService.saveDataForProvince = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForProvince) {
      this.dataSource.data = this.closeTabService.saveDataForProvince;
    }
    else {
      this.dataSource.data = await this.sectorsManagerService.getProvinceDataSource();
      this.closeTabService.saveDataForProvince = this.dataSource.data;
    }
    this.countryDictionary = await this.sectorsManagerService.getCountryDictionary();
    this.editableDataSource = JSON.parse(JSON.stringify(this.dataSource.data));

    this.sectorsManagerService.convertIdToTitle(this.dataSource.data, this.countryDictionary, 'countryId');
    this.filterSearchs();
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
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.countryId.toString().toLowerCase().indexOf(searchTerms.countryId) !== -1
        && data.logicalOrder.toString().toLowerCase().indexOf(searchTerms.logicalOrder) !== -1
    }
    return filterFunction;
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe())
  }
}
