import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { AddNewComponent } from '../../role-manager/add-new/add-new.component';
import { DeleteDialogComponent } from '../../role-manager/delete-dialog/delete-dialog.component';
import { IZoneManager } from './../../../Interfaces/izone-manager';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {
  titleFilter = new FormControl('');
  regionIdFilter = new FormControl('');
  logicalOrderFilter = new FormControl('');
  isMetroFilter = new FormControl('');
  dataSource = new MatTableDataSource();

  columnsToDisplay = ['title', 'regionId', 'logicalOrder', 'isMetro', 'actions'];
  filterValues = {
    title: '',
    regionId: '',
    logicalOrder: '',
    isMetro: ''
  };

  constructor(private interfaceManagerService: InterfaceManagerService, private dialog: MatDialog) { }

  openDialog = () => {
    const dialogConfig = new MatDialogConfig();
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(AddNewComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addZoneManager(result).subscribe(res => {
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
  deleteSingleRow = async (row: IZoneManager) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      return new Promise((resolve) => {
        this.interfaceManagerService.deleteZoneManager(row.id).subscribe(res => {
          if (res) {
            resolve(res);
          }
        });
      });
    }
  }

  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getZoneManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  classWrapper = async () => {
    const rolesData = await this.getDataSource();
    console.log(rolesData);

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
      this.regionIdFilter.valueChanges
        .subscribe(
          regionId => {
            this.filterValues.regionId = regionId;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.regionIdFilter.valueChanges
        .subscribe(
          regionId => {
            this.filterValues.regionId = regionId;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.isMetroFilter.valueChanges
        .subscribe(
          isMetro => {
            this.filterValues.isMetro = isMetro;
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
  }
  ngOnInit() {
    this.classWrapper();
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.regionId.toString().toLowerCase().indexOf(searchTerms.regionId) !== -1
        && data.logicalOrder.toLowerCase().indexOf(searchTerms.logicalOrder) !== -1
    }
    return filterFunction;
  }
}

