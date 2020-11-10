import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { AddNewComponent } from '../add-new/add-new.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ICounterState } from './../../../Interfaces/icounter-state';
import { ITrueFalseFilter, TrueFalseFilter } from './../../../Interfaces/itrue-false-filter';

@Component({
  selector: 'app-counter-state',
  templateUrl: './counter-state.component.html',
  styleUrls: ['./counter-state.component.scss']
})
export class CounterStateComponent implements OnInit {
  trueFalseFilter: ITrueFalseFilter[] = TrueFalseFilter;

  titleFilter = new FormControl('');
  moshtarakinIdFilter = new FormControl('');
  zoneIdFilter = new FormControl('');
  clientOrderFilter = new FormControl('');
  canEnterNumberFilter = new FormControl('');
  isManeFilter = new FormControl('');
  canNumberBeLessThanPreFilter = new FormControl('');
  isTaviziFilter = new FormControl('');
  shouldEnterNumberFilter = new FormControl('');
  isXarabFilter = new FormControl('');
  isFaqedFilter = new FormControl('');

  dataSource = new MatTableDataSource();

  columnsToDisplay = [
    'title',
    'moshtarakinId',
    'zoneId',
    'clientOrder',
    'canEnterNumber',
    'isMane',
    'canNumberBeLessThanPre',
    'isTavizi',
    'shouldEnterNumber',
    'isXarab',
    'isFaqed',
    'actions'
  ];
  filterValues = {
    title: '',
    moshtarakinId: '',
    zoneId: '',
    clientOrder: '',
    canEnterNumber: '',
    isMane: '',
    canNumberBeLessThanPre: '',
    isTavizi: '',
    shouldEnterNumber: '',
    isXarab: '',
    isFaqed: '',
  };

  constructor(private interfaceManagerService: InterfaceManagerService, private dialog: MatDialog) { }

  openDialog = () => {
    const dialogConfig = new MatDialogConfig();
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(AddNewComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addCounterState(result).subscribe(res => {
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
  deleteSingleRow = async (row: ICounterState) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      return new Promise((resolve) => {
        this.interfaceManagerService.deleteCounterState(row.id).subscribe(res => {
          if (res) {
            resolve(res);
          }
        });
      });
    }
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getCounterState().subscribe((res: ICounterState[]) => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  filterSearchs = () => {
    this.titleFilter.valueChanges
      .subscribe(
        title => {
          this.filterValues.title = title;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.moshtarakinIdFilter.valueChanges
      .subscribe(
        moshtarakinId => {
          this.filterValues.moshtarakinId = moshtarakinId;
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
    this.clientOrderFilter.valueChanges
      .subscribe(
        clientOrder => {
          this.filterValues.clientOrder = clientOrder;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.canEnterNumberFilter.valueChanges
      .subscribe(
        canEnterNumber => {
          this.filterValues.canEnterNumber = canEnterNumber;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.isManeFilter.valueChanges
      .subscribe(
        isMane => {
          this.filterValues.isMane = isMane;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.canNumberBeLessThanPreFilter.valueChanges
      .subscribe(
        canNumberBeLessThanPre => {
          this.filterValues.canNumberBeLessThanPre = canNumberBeLessThanPre;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.isTaviziFilter.valueChanges
      .subscribe(
        isTavizi => {
          this.filterValues.isTavizi = isTavizi;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.shouldEnterNumberFilter.valueChanges
      .subscribe(
        shouldEnterNumber => {
          this.filterValues.shouldEnterNumber = shouldEnterNumber;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.isXarabFilter.valueChanges
      .subscribe(
        isXarab => {
          this.filterValues.isXarab = isXarab;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.isFaqedFilter.valueChanges
      .subscribe(
        isFaqed => {
          this.filterValues.isFaqed = isFaqed;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  classWrapper = async () => {
    const rolesData = await this.getDataSource();
    console.log(rolesData);

    if (rolesData) {
      this.dataSource.data = rolesData;
      this.dataSource.filterPredicate = this.createFilter();
      this.filterSearchs();
    }
  }
  ngOnInit() {
    this.classWrapper();
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.moshtarakinId.toLowerCase().indexOf(searchTerms.moshtarakinId) !== -1
        && data.zoneId.toLowerCase().indexOf(searchTerms.zoneId) !== -1
        && data.clientOrder.toLowerCase().indexOf(searchTerms.clientOrder) !== -1
        && data.canEnterNumber.toLowerCase().indexOf(searchTerms.canEnterNumber) !== -1
        && data.isMane.toLowerCase().indexOf(searchTerms.isMane) !== -1
        && data.canNumberBeLessThanPre.toLowerCase().indexOf(searchTerms.canNumberBeLessThanPre) !== -1
        && data.isTavizi.toLowerCase().indexOf(searchTerms.isTavizi) !== -1
        && data.shouldEnterNumber.toLowerCase().indexOf(searchTerms.shouldEnterNumber) !== -1
        && data.isXarab.toLowerCase().indexOf(searchTerms.isXarab) !== -1
        && data.isFaqed.toLowerCase().indexOf(searchTerms.isFaqed) !== -1
    }
    return filterFunction;
  }
}

