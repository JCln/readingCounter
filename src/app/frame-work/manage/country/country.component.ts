import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IRoleManager } from 'src/app/Interfaces/irole-manager';

import { DialogContentExampleDialog, DialogEdit } from '../../role-manager/role-manager.component';
import { ICountryManager } from './../../../Interfaces/icountry-manager';
import { InterfaceManagerService } from './../../../services/interface-manager.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title'];
  dataSource: MatTableDataSource<ICountryManager>;

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

  constructor(public dialog: MatDialog, private interfaceManagerService: InterfaceManagerService) {
    // this.dataSource.filterPredicate = this.createFilter();
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
      this.interfaceManagerService.getRole().subscribe(res => {
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
        this.interfaceManagerService.deleteRole(row.id).subscribe(res => {
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
      return data.title.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
    }
    return filterFunction;
  }
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
