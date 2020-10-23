import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IRoleManager } from 'src/app/Interfaces/irole-manager';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { AddNewComponent } from './add-new/add-new.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.scss']
})
export class RoleManagerComponent implements OnInit {


  idFilter = new FormControl('');
  titleFilter = new FormControl('');
  titleUnicodeFilter = new FormControl('');
  needDeviceIdLoginFilter = new FormControl('');
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['title', 'titleUnicode', 'needDeviceIdLogin', 'actions'];
  filterValues = {
    title: '',
    id: '',
    titleUnicode: '',
    needDeviceIdLogin: ''
  };

  constructor(private interfaceManagerService: InterfaceManagerService, private dialog: MatDialog) { }

  openDialog = () => {
    const dialogConfig = new MatDialogConfig();
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(AddNewComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addRole(result).subscribe(res => {
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
  deleteSingleRow = async (row: IRoleManager) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      return new Promise((resolve) => {
        this.interfaceManagerService.deleteRole(row.id).subscribe(res => {
          if (res) {
            resolve(res);
          }
        });
      });
    }
  }
  editDialog = (row: IRoleManager) => {
    // return new Promise(resolve => {
    //   const dialogRef = this.dialog.open(DialogEdit, {
    //     data: { id: this.id, title: this.title, isActive: this.isActive }
    //   });
    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log(result);

    //     resolve(result)
    //   });
    // });
  }
  getRole = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getRole().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  classWrapper = async () => {
    const rolesData = await this.getRole();
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
      this.idFilter.valueChanges
        .subscribe(
          id => {
            this.filterValues.id = id;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.titleUnicodeFilter.valueChanges
        .subscribe(
          titleUnicode => {
            this.filterValues.titleUnicode = titleUnicode;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.needDeviceIdLoginFilter.valueChanges
        .subscribe(
          needDeviceIdLogin => {
            this.filterValues.needDeviceIdLogin = needDeviceIdLogin;
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
        && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        && data.titleUnicode.toLowerCase().indexOf(searchTerms.titleUnicode) !== -1
    }
    return filterFunction;
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  styleUrls: ['role-manager.component.scss'],
  templateUrl: 'dialog-content-example-dialog.html'
})
export class DialogContentExampleDialog { }

@Component({
  selector: 'dialog-edit',
  styleUrls: ['role-manager.component.scss'],
  templateUrl: 'dialog-edit.html'
})
export class DialogEdit { }

