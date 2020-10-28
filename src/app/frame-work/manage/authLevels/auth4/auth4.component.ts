import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { IProvinceManager } from 'src/app/Interfaces/iprovince-manager';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { AddNewComponent } from '../../add-new/add-new.component';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { IAuthLevel4 } from './../../../../Interfaces/iauth-levels';


@Component({
  selector: 'app-auth4',
  templateUrl: './auth4.component.html',
  styleUrls: ['./auth4.component.scss']
})
export class Auth4Component implements OnInit {
  titleFilter = new FormControl('');
  authLevel3IdFilter = new FormControl('');
  dataSource = new MatTableDataSource();

  auth3Dictionary: IDictionaryManager[] = [];
  columnsToDisplay = ['title', 'authLevel3Id', 'actions'];
  filterValues = {
    title: '',
    authLevel3Id: ''
  };

  constructor(private interfaceManagerService: InterfaceManagerService, private dialog: MatDialog) { }

  // add auth 2 not working
  openDialog = () => {
    const dialogConfig = new MatDialogConfig();
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(AddNewComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addProvinceManager(result).subscribe(res => {
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
        this.interfaceManagerService.deleteAuthLevel4Manager(row.id).subscribe(res => {
          if (res) {
            resolve(res);
          }
        });
      });
    }
  }
  convertIdToTitle = (dataSource: IAuthLevel4[], dictionary: IDictionaryManager[]) => {
    dictionary.map(dic => {
      dataSource.map(dataSource => {
        if (dic.id === dataSource.id)
          dataSource.authLevel3Id = dic.title;
      })
    });
  }
  getAuthLevel4IdDictionary = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAuthLevel3DictionaryManager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAuthLevel4Manager().subscribe(res => {
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
    this.authLevel3IdFilter.valueChanges
      .subscribe(
        authLevel3Id => {
          this.filterValues.authLevel3Id = authLevel3Id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  classWrapper = async () => {
    const rolesData = await this.getDataSource();
    this.dataSource.data = rolesData;
    this.auth3Dictionary = await this.getAuthLevel4IdDictionary();
    this.convertIdToTitle(rolesData, this.auth3Dictionary);
    this.filter();
  }
  ngOnInit() {
    this.classWrapper();
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.authLevel3Id.toString().toLowerCase().indexOf(searchTerms.authLevel3Id) !== -1
    }
    return filterFunction;
  }
}