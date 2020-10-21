import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IRoleManager } from './../../Interfaces/irole-manager';
import { InterfaceService } from './../../services/interface.service';

@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.scss']
})
export class RoleManagerComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'titleUnicode', 'needDeviceIdLogin', 'actions'];
  dataSource: MatTableDataSource<IRoleManager>;

  @ViewChild(MatSort) sort: MatSort;

  // forDialog///
  title;
  id;
  isActive;

  constructor(public dialog: MatDialog, private interfaceService: InterfaceService) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // addRowData(row_obj) {
  //   var d = new Date();
  //   this.dataSource.push({
  //     id: d.getTime(),
  //     name: row_obj.name
  //   });
  //   this.table.renderRows();

  // }
  // updateRowData(row_obj) {
  //   this.dataSource = this.dataSource.filter((value, key) => {
  //     if (value.id == row_obj.id) {
  //       value.name = row_obj.name;
  //     }
  //     return true;
  //   });
  // }
  // deleteRowData(row_obj) {
  //   this.dataSource = this.dataSource.filter((value, key) => {
  //     return value.id != row_obj.id;
  //   });
  // }


  getRole = (): any => {
    return new Promise((resolve) => {
      this.interfaceService.getRole().subscribe(res => {
        if (res) {
          resolve(res);

        }
      });
    });
  }


  openDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
        resolve(result)
      });
    });
  }

  deleteSingleRow = async (row: IRoleManager) => {
    const dialogResult = await this.openDialog();
    if (dialogResult) {
      return new Promise((resolve) => {
        this.interfaceService.deleteRole(row.id).subscribe(res => {
          if (res) {
            resolve(res);
          }
        });
      });
    }
  }
  editDialog = (row: IRoleManager) => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(DialogEdit, {
        data: { id: this.id, title: this.title, isActive: this.isActive }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);

        resolve(result)
      });
    });
  }
  // connectToServer = (): any => {

  // }
  classWrapper = async () => {
    const a = await this.getRole();
    this.dataSource = new MatTableDataSource(a);
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  ngAfterViewInit(): void {
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog { }

@Component({
  selector: 'dialog-edit',
  styleUrls: ['role-manager.component.scss'],
  templateUrl: 'dialog-edit.html',
})
export class DialogEdit { }