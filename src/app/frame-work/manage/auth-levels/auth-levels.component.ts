import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ICountryManager } from 'src/app/Interfaces/icountry-manager';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { AddNewComponent } from '../add-new/add-new.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { IAuthLevel2, IAuthLevel3, IAuthLevels } from './../../../Interfaces/iauth-levels';

@Component({
  selector: 'app-auth-levels',
  templateUrl: './auth-levels.component.html',
  styleUrls: ['./auth-levels.component.scss']
})
export class AuthLevelsComponent implements OnInit {
  authLevel1All: IAuthLevels[] = [];
  authLevel2All: IAuthLevel2[] = [];
  authLevel3All: IAuthLevel3[] = [];

  titleFilter = new FormControl('');
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['title', 'authLevel1All', 'actions'];
  filterValues = {
    title: ''
  };

  constructor(private interfaceManagerService: InterfaceManagerService, private dialog: MatDialog) { }

  openDialog = () => {
    const dialogConfig = new MatDialogConfig();
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(AddNewComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addCountryManager(result).subscribe(res => {
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
  deleteSingleRow = async (row: ICountryManager) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      return new Promise((resolve) => {
        this.interfaceManagerService.deleteCountryManager(row.id).subscribe(res => {
          if (res) {
            resolve(res);
          }
        });
      });
    }
  }
  getAuthLevel1 = (): Promise<IAuthLevels> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAuthLevel1Manager().subscribe(res => {
        if (res) {
          this.authLevel1All = res;
          resolve(res);
        }
      })
    });
  }
  getAuthLevel2 = (): Promise<IAuthLevel2> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAuthLevel2Manager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }
  getAuthLevel3 = (): Promise<IAuthLevel3> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAuthLevel3Manager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }
  authLevelsWrapper = async () => {
    const a = await this.getAuthLevel1();
    this.dataSource.data.push(a);
    console.log(this.dataSource);
    
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getCountryManager().subscribe(res => {
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
      }
      this.authLevelsWrapper();
  }
  ngOnInit() {
    this.classWrapper();
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
    }
    return filterFunction;
  }
}