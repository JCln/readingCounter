import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { IResponses } from 'src/app/Interfaces/iresponses';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { IProvinceManager } from './../../../Interfaces/iprovince-manager';
import { SnackWrapperService } from './../../../services/snack-wrapper.service';
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
    private router: Router
  ) { }

  openDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ProvinceAddDgComponent,
        {
          width: '30rem',
          data: {
            di: this.countryDictionary
          }

        });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);

        if (result) {
          this.interfaceManagerService.addProvinceManager(result).subscribe((res: IResponses) => {
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
      const dialogRef = this.dialog.open(ProvinceEditDgComponent, {
        width: '30rem',
        data: {
          row,
          editable,
          di: this.countryDictionary
        }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editProvinceManager(result).subscribe((res: IResponses) => {
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
  deleteSingleRow = async (row: IProvinceManager) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      this.interfaceManagerService.deleteProvinceManager(row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
        }
      });
    }
  }
  convertIdToTitle = (dataSource: any[], zoneDictionary: IDictionaryManager[]) => {

    zoneDictionary.map(zoneDic => {
      dataSource.map(dataSource => {
        if (dataSource.countryId == zoneDic.id) {
          dataSource.countryId = zoneDic.title;
        }
      })
    });
  }
  getProvinceDictionary = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getCountryDictionaryManager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getProvinceManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
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
  nullSavedSource = () => this.interactionService.saveDataForProvince = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.interactionService.saveDataForProvince) {
      this.dataSource.data = this.interactionService.saveDataForProvince;
      this.countryDictionary = this.interactionService.saveDictionaryForProvince;
    }
    else {
      this.dataSource.data = await this.getDataSource();
      this.countryDictionary = await this.getProvinceDictionary();
      this.interactionService.saveDataForProvince = this.dataSource.data;
      this.interactionService.saveDictionaryForProvince = this.countryDictionary;
    }
    this.editableDataSource = JSON.parse(JSON.stringify(this.dataSource.data));

    this.convertIdToTitle(this.dataSource.data, this.countryDictionary);
  }
  ngOnInit() {
    this.classWrapper();
  }
  closeTabStatus = () => {
    this.subscription.push(this.interactionService.getClosedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url) {
          this.nullSavedSource();
        }
      }
    })
    )
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url)
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
    this.closeTabStatus();
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
