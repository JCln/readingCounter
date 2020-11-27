import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IResponses } from 'src/app/Interfaces/iresponses';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { IDictionaryManager } from './../../../Interfaces/IDictionaryManager';
import { IRegionManager } from './../../../Interfaces/iregion-manager';
import { SnackWrapperService } from './../../../services/snack-wrapper.service';
import { RegionAddDgComponent } from './region-add-dg/region-add-dg.component';
import { RegionEditDgComponent } from './region-edit-dg/region-edit-dg.component';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit, AfterViewInit, OnDestroy {
  titleFilter = new FormControl('');
  provinceIdFilter = new FormControl('');
  logicalOrderFilter = new FormControl('');

  dataSource = new MatTableDataSource();
  editableDataSource = [];

  regionDictionary: IDictionaryManager[] = [];
  subscription: Subscription

  columnsToDisplay = ['title', 'provinceId', 'logicalOrder', 'actions'];
  filterValues = {
    title: '',
    provinceId: '',
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
      const dialogRef = this.dialog.open(RegionAddDgComponent,
        {
          width: '30rem',
          data: {
            di: this.regionDictionary
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addRegionManager(result).subscribe((res: IResponses) => {
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
    const editable = this.getEditableSource(row).provinceId;
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(RegionEditDgComponent, {
        width: '30rem',
        data: {
          row, di: this.regionDictionary, editable
        }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editRegionManager(result).subscribe((res: IResponses) => {
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
  deleteSingleRow = async (row: IRegionManager) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      this.interfaceManagerService.deleteRegionManager(row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
        }
      });
    }
  }
  convertIdToTitle = (dataSource: IRegionManager[], zoneDictionary: IDictionaryManager[]) => {
    zoneDictionary.map(zoneDic => {
      dataSource.map(dataSource => {
        if (zoneDic.id === dataSource.provinceId)
          dataSource.provinceId = zoneDic.title;
      })
    });
  }
  getRegionDictionary = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getProvinceDictionaryManager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getRegionManager().subscribe(res => {
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
    this.provinceIdFilter.valueChanges
      .subscribe(
        provinceId => {
          this.filterValues.provinceId = provinceId;
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
  classWrapper = async () => {
    const rolesData = await this.getDataSource();
    this.editableDataSource = JSON.parse(JSON.stringify(rolesData));

    if (rolesData) {
      this.dataSource.data = rolesData;
      this.filterSearchs();
      const regionDictionary = await this.getRegionDictionary();
      this.regionDictionary = regionDictionary;
      this.convertIdToTitle(rolesData, regionDictionary);
    }
  }
  ngOnInit() {
    this.classWrapper();
  }
  ngAfterViewInit(): void {
    this.subscription = this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url)
          this.ngOnInit();
      }
    })
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.unsubscribe();
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.provinceId.toLowerCase().indexOf(searchTerms.provinceId) !== -1
        && data.logicalOrder.toString().toLowerCase().indexOf(searchTerms.logicalOrder) !== -1
    }
    return filterFunction;
  }
}

