import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { AddNewComponent } from '../../role-manager/add-new/add-new.component';
import { DeleteDialogComponent } from '../../role-manager/delete-dialog/delete-dialog.component';
import { IZoneBoundManager } from './../../../Interfaces/izone-bound-manager';

@Component({
  selector: 'app-zone-bound',
  templateUrl: './zone-bound.component.html',
  styleUrls: ['./zone-bound.component.scss']
})
export class ZoneBoundComponent implements OnInit {

  titleFilter = new FormControl('');
  zoneIdFilter = new FormControl('');
  govermentalCodeFilter = new FormControl('');
  fromEshterakFilter = new FormControl('');
  toEshterakFilter = new FormControl('');
  fromRadifFilter = new FormControl('');
  toRadifFilter = new FormControl('');
  dbInitialCatalogFilter = new FormControl('');

  dataSource = new MatTableDataSource();

  columnsToDisplay = ['title', 'zoneId', 'logicalOrder', 'govermentalCode', 'fromEshterak', 'toEshterak', 'fromRadif', 'toRadif', 'dbInitialCatalog', 'actions'];
  filterValues = {
    title: '',
    zoneId: '',
    govermentalCode: '',
    fromEshterak: '',
    toEshterak: '',
    fromRadif: '',
    toRadif: '',
    dbInitialCatalog: '',
  };

  constructor(private interfaceManagerService: InterfaceManagerService, private dialog: MatDialog) { }

  openDialog = () => {
    const dialogConfig = new MatDialogConfig();
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(AddNewComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addZoneBoundManager(result).subscribe(res => {
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
  deleteSingleRow = async (row: IZoneBoundManager) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      return new Promise((resolve) => {
        this.interfaceManagerService.deleteZoneBoundManager(row.id).subscribe(res => {
          if (res) {
            resolve(res);
          }
        });
      });
    }
  }

  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getZoneBoundManager().subscribe(res => {
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
      this.zoneIdFilter.valueChanges
        .subscribe(
          zoneId => {
            this.filterValues.zoneId = zoneId;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.govermentalCodeFilter.valueChanges
        .subscribe(
          govermentalCode => {
            this.filterValues.govermentalCode = govermentalCode;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.fromEshterakFilter.valueChanges
        .subscribe(
          fromEshterak => {
            this.filterValues.fromEshterak = fromEshterak;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.toEshterakFilter.valueChanges
        .subscribe(
          toEshterak => {
            this.filterValues.toEshterak = toEshterak;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )

      this.toRadifFilter.valueChanges
        .subscribe(
          toRadif => {
            this.filterValues.toRadif = toRadif;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.dbInitialCatalogFilter.valueChanges
        .subscribe(
          dbInitialCatalog => {
            this.filterValues.dbInitialCatalog = dbInitialCatalog;
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
        && data.zoneId.toLowerCase().indexOf(searchTerms.zoneId) !== -1
        && data.govermentalCode.toLowerCase().indexOf(searchTerms.govermentalCode) !== -1
        && data.zoneId.toLowerCase().indexOf(searchTerms.zoneId) !== -1
        && data.fromEshterak.toLowerCase().indexOf(searchTerms.fromEshterak) !== -1
        && data.toEshterak.toLowerCase().indexOf(searchTerms.toEshterak) !== -1
        && data.fromRadif.toString().toLowerCase().indexOf(searchTerms.fromRadif) !== -1
        && data.toRadif.toString().toLowerCase().indexOf(searchTerms.toRadif) !== -1
        && data.dbInitialCatalog.toLowerCase().indexOf(searchTerms.dbInitialCatalog) !== -1
    }
    return filterFunction;
  }
}