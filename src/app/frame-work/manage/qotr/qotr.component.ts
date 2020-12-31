import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { IResponses } from 'src/app/Interfaces/iresponses';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { QotrAddDgComponent } from './qotr-add-dg/qotr-add-dg.component';
import { QotrEditDgComponent } from './qotr-edit-dg/qotr-edit-dg.component';

@Component({
  selector: 'app-qotr',
  templateUrl: './qotr.component.html',
  styleUrls: ['./qotr.component.scss']
})
export class QotrComponent implements OnInit, AfterViewInit, OnDestroy {
  idFilter = new FormControl('');
  titleFilter = new FormControl('');
  provinceIdFilter = new FormControl('');
  provinceFilter = new FormControl('');

  dataSource = new MatTableDataSource();
  editableDataSource = [];

  subscription: Subscription[] = [];
  countryDictionary: IDictionaryManager[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnsToDisplay = ['title', 'provinceId', 'province', 'actions'];
  filterValues = {
    id: '',
    title: '',
    provinceId: '',
    province: ''
  };

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dialog: MatDialog,
    private snackWrapperService: SnackWrapperService,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) { }

  openDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(QotrAddDgComponent,
        {
          width: '30rem',
          data: {
            di: this.countryDictionary
          }

        });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);

        if (result) {
          this.interfaceManagerService.addQotr(result).subscribe((res: IResponses) => {
            if (res) {
              this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
            }
          })
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
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(QotrEditDgComponent, {
        width: '30rem',
        data: {
          row,
          editable,
          di: this.countryDictionary
        }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editQotr(result).subscribe((res: IResponses) => {
            if (res) {
              this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
            }
          })
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
  deleteSingleRow = async (row: any) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      this.interfaceManagerService.deleteQotr(row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
        }
      });
    }
  }
  convertIdToTitle = (dataSource: any[], zoneDictionary: IDictionaryManager[]) => {
    zoneDictionary.map(zoneDic => {
      dataSource.map(dataSource => {
        if (zoneDic.id === dataSource.provinceId)
          dataSource.provinceId = zoneDic.title;
      })
    });
  }
  getProvinceDictionary = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getProvinceDictionaryManager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getQotr().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  filterSearchs = () => {
    this.dataSource.paginator = this.paginator;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.filterPredicate = this.createFilter();

    this.titleFilter.valueChanges
      .subscribe(
        title => {
          this.filterValues.title = title;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.provinceIdFilter.valueChanges
      .subscribe(
        provinceId => {
          this.filterValues.provinceId = provinceId;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.provinceFilter.valueChanges
      .subscribe(
        province => {
          this.filterValues.province = province;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  nullSavedSource = () => this.closeTabService.saveDataForQotrManager = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForQotrManager) {
      this.dataSource.data = this.closeTabService.saveDataForQotrManager;
      this.countryDictionary = this.closeTabService.saveDictionaryForProvince;
    }
    else {
      this.dataSource.data = await this.getDataSource();
      this.countryDictionary = await this.getProvinceDictionary();
      this.closeTabService.saveDataForQotrManager = this.dataSource.data;
      this.closeTabService.saveDictionaryForProvince = this.countryDictionary;
    }
    // this.editableDataSource = JSON.parse(JSON.stringify(this.dataSource.data));

    this.convertIdToTitle(this.dataSource.data, this.countryDictionary);
    this.filterSearchs();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/qr')
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
        && data.provinceId.toString().toLowerCase().indexOf(searchTerms.provinceId) !== -1
        && data.province.toLowerCase().indexOf(searchTerms.province) !== -1
    }
    return filterFunction;
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe())
  }
}