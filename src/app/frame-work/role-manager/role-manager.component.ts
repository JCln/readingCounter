import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  titleUnicodeFilter = new FormControl();
  titleFilter = new FormControl();


  filteredValues = {
    title: ''
  };

  // forDialog///
  title;
  id;
  isActive;
  //////

  constructor(public dialog: MatDialog, private interfaceService: InterfaceService) {
    this.dataSource.filterPredicate = this.createFilter();
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  filterTest(filterValue: string, column: string) {
    let filter = {
      title: filterValue.trim().toLowerCase(),
      [column]: column
    };
    if (!filterValue) delete filter[column];

    this.dataSource.filter = JSON.stringify(filter);
  }

  filterTitle(event: Event) {
    console.log(this.dataSource.filteredData);
    const titleFilter = this.dataSource.filteredData;
    // const titleFilter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = titleFilter.toString();
  }
  filterTitleUnicode(event: Event) {
    console.log((event.target as HTMLInputElement).value);

    const titleUnicodeFilter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = titleUnicodeFilter.trim().toLocaleLowerCase();
  }
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
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
        && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
    }
    return filterFunction;
  }

  // customFilterPredicate() {
  //   const myFilterPredicate = function (
  //     data: IRoleManager,
  //     filter: string
  //   ): boolean {
  //     let searchString = JSON.parse(filter);
  //     let titleFound =
  //       data.title

  //         .indexOf(searchString.title.toLowerCase()) !== -1;
  //     let titleUnicodeFound =
  //       data.titleUnicode

  //         .indexOf(searchString.position) !== -1;
  //     if (searchString.topFilter) {
  //       return titleFound || titleUnicodeFound;
  //     } else {
  //       return titleFound && titleUnicodeFound;
  //     }
  //   };
  //   return myFilterPredicate;
  // }
  ngAfterViewInit(): void {
    this.titleFilter.valueChanges
      .subscribe(
        title => {
          this.filteredValues.title = title;
          this.dataSource.filter = JSON.stringify(this.filteredValues);
        }
      )
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