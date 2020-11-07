import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { IZoneManager } from 'src/app/Interfaces/izone-manager';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { AddNewComponent } from '../add-new/add-new.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-counter-state',
  templateUrl: './counter-state.component.html',
  styleUrls: ['./counter-state.component.scss']
})
export class CounterStateComponent implements OnInit {
  titleFilter = new FormControl('');
  dataSource = new MatTableDataSource();

  selectedValue;
  items: string[] = ['شهری', 'غیرشهری'];
  zoneId: any[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  columnsToDisplay = ['title', 'actions'];
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
  deleteSingleRow = async (row: IZoneManager) => {
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
  // convertIdToTitle = (dataSource: IZoneManager[], zoneDictionary: IDictionaryManager[]) => {
  //   zoneDictionary.map(zoneDic => {
  //     dataSource.map(dataSource => {
  //       if (zoneDic.id === dataSource.id)
  //         dataSource.regionId = zoneDic.title;
  //     })
  //   });
  // }
  // getZoneDictionary = (): any => {
  //   return new Promise((resolve) => {
  //     this.interfaceManagerService.getRegionDictionaryManager().subscribe(res => {
  //       if (res)
  //         resolve(res);
  //     })
  //   });
  // }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getCounterState().subscribe(res => {
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

    // const zoneDictionary = await this.getZoneDictionary();
    // console.log(zoneDictionary);

    // this.zoneDictionary = zoneDictionary;

    // this.convertIdToTitle(rolesData, zoneDictionary);

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

