import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { IDictionaryManager } from './../../../Interfaces/IDictionaryManager';
import { IRegionManager } from './../../../Interfaces/iregion-manager';
import { RegionAddDgComponent } from './region-add-dg/region-add-dg.component';
import { RegionEditDgComponent } from './region-edit-dg/region-edit-dg.component';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  idFilter = new FormControl('');
  titleFilter = new FormControl('');
  provinceIdFilter = new FormControl('');
  logicalOrderFilter = new FormControl('');
  dataSource = new MatTableDataSource();

  regionDictionary: IDictionaryManager[] = [];

  columnsToDisplay = ['title', 'provinceId', 'logicalOrder', 'actions'];
  filterValues = {
    title: '',
    provinceId: '',
    logicalOrder: ''
  };

  constructor(private interfaceManagerService: InterfaceManagerService, private dialog: MatDialog) { }

  openDialog = () => {
    const dialogConfig = new MatDialogConfig();
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(RegionAddDgComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addRegionManager(result.value).subscribe(res => {
            if (res) {
              console.log(res);

            }
          })
        }
      });
    });
  }
  editDialog = (row: any) => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(RegionEditDgComponent, {
        width: '50%',
        data: {
          row, di: this.regionDictionary
        }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editRegionManager(result).subscribe(res => {
            if (res) {
              console.log(res);

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
      return new Promise((resolve) => {
        this.interfaceManagerService.deleteRegionManager(row.id).subscribe(res => {
          if (res) {
            resolve(res);
          }
        });
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
  classWrapper = async () => {
    const rolesData = await this.getDataSource();

    if (rolesData) {
      this.dataSource.data = rolesData;
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
    const regionDictionary = await this.getRegionDictionary();
    this.regionDictionary = regionDictionary;
    this.convertIdToTitle(rolesData, regionDictionary);
  }
  ngOnInit() {
    this.classWrapper();
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.provinceId.toLowerCase().indexOf(searchTerms.provinceId) !== -1
        && data.logicalOrder.toLowerCase().indexOf(searchTerms.logicalOrder) !== -1
    }
    return filterFunction;
  }
}

