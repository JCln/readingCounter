import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { IProvinceManager } from 'src/app/Interfaces/iprovince-manager';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { IAuthLevel3 } from './../../../../Interfaces/iauth-levels';
import { Auth3AddDgComponent } from './auth3-add-dg/auth3-add-dg.component';
import { Auth3EditDgComponent } from './auth3-edit-dg/auth3-edit-dg.component';


@Component({
  selector: 'app-auth3',
  templateUrl: './auth3.component.html',
  styleUrls: ['./auth3.component.scss']
})
export class Auth3Component implements OnInit {
  titleFilter = new FormControl('');
  authLevel2IdFilter = new FormControl('');

  dataSource = new MatTableDataSource();

  auth2Dictionary: IDictionaryManager[] = [];
  columnsToDisplay = ['title', 'authLevel2Id', 'actions'];
  filterValues = {
    title: '',
    authLevel2Id: ''
  };

  constructor(private interfaceManagerService: InterfaceManagerService, private dialog: MatDialog) { }

  // add auth 2 not working
  openDialog = () => {
    const dialogConfig = new MatDialogConfig();
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(Auth3AddDgComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addAuthLevel3Manager(result).subscribe(res => {
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
      const dialogRef = this.dialog.open(Auth3EditDgComponent, {
        width: '50%',
        data: row

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addAuthLevel3Manager(result).subscribe(res => {
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
  deleteSingleRow = async (row: IProvinceManager) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      return new Promise((resolve) => {
        this.interfaceManagerService.deleteAuthLevel3Manager(row.id).subscribe(res => {
          if (res) {
            resolve(res);
          }
        });
      });
    }
  }
  convertIdToTitle = (dataSource: IAuthLevel3[], zoneDictionary: IDictionaryManager[]) => {
    zoneDictionary.map(zoneDic => {
      dataSource.map(dataSource => {
        if (zoneDic.id === dataSource.id)
          dataSource.authLevel2Id = zoneDic.title;
      })
    });
  }
  getAuthLevel2Id = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAuthLevel2DictionaryManager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAuthLevel3Manager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  filter = () => {
    this.dataSource.filterPredicate = this.createFilter();

    this.titleFilter.valueChanges
      .subscribe(
        title => {
          this.filterValues.title = title;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.authLevel2IdFilter.valueChanges
      .subscribe(
        authLevel2Id => {
          this.filterValues.authLevel2Id = authLevel2Id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  classWrapper = async () => {
    const rolesData = await this.getDataSource();
    this.dataSource.data = rolesData;
    this.auth2Dictionary = await this.getAuthLevel2Id();
    console.log(this.auth2Dictionary);
    console.log(this.dataSource.data);

    this.convertIdToTitle(rolesData, this.auth2Dictionary);
    this.filter();
  }
  ngOnInit() {
    this.classWrapper();
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.authLevel2Id.toLowerCase().indexOf(searchTerms.authLevel2Id) !== -1
    }
    return filterFunction;
  }
}