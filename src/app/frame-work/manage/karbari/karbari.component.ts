import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { IZoneManager } from 'src/app/Interfaces/izone-manager';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { AddNewComponent } from '../add-new/add-new.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

interface trueFalse {
  name: string;
  value: string | boolean;

}
@Component({
  selector: 'app-karbari',
  templateUrl: './karbari.component.html',
  styleUrls: ['./karbari.component.scss']
})
export class KarbariComponent implements OnInit {
  titleFilter = new FormControl('');
  moshtarakinIdFilter = new FormControl('');
  provinceIdFilter = new FormControl('');
  hasReadingVibrateFilter = new FormControl('');
  isMaskooniFilter = new FormControl('');
  isSaxtFilter = new FormControl('');

  dataSource = new MatTableDataSource();

  isTrueF: trueFalse[] = [
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
  ]
  zoneId: any[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  columnsToDisplay = ['title', 'moshtarakinId', 'provinceId', 'hasReadingVibrate', 'isMaskooni', 'isSaxt', 'actions'];
  filterValues = {
    title: '',
    moshtarakinId: '',
    provinceId: '',
    hasReadingVibrate: '',
    isMaskooni: '',
    isSaxt: ''
  };

  constructor(private interfaceManagerService: InterfaceManagerService, private dialog: MatDialog) { }

  openDialog = () => {
    const dialogConfig = new MatDialogConfig();
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(AddNewComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addKarbari(result).subscribe(res => {
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
        this.interfaceManagerService.deleteKarbari(row.id).subscribe(res => {
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
      this.interfaceManagerService.getKarbari().subscribe(res => {
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
      this.moshtarakinIdFilter.valueChanges
        .subscribe(
          moshtarakinId => {
            this.filterValues.moshtarakinId = moshtarakinId;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.provinceIdFilter.valueChanges
        .subscribe(
          provinceId => {
            this.filterValues.provinceId = provinceId;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.hasReadingVibrateFilter.valueChanges
        .subscribe(
          hasReadingVibrate => {
            this.filterValues.hasReadingVibrate = hasReadingVibrate;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.isMaskooniFilter.valueChanges
        .subscribe(
          isMaskooni => {
            this.filterValues.isMaskooni = isMaskooni;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.isSaxtFilter.valueChanges
        .subscribe(
          isSaxt => {
            this.filterValues.isSaxt = isSaxt;
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
        && data.moshtarakinId.toString().toLowerCase().indexOf(searchTerms.moshtarakinId) !== -1
        && data.provinceId.toString().toLowerCase().indexOf(searchTerms.provinceId) !== -1
        && data.hasReadingVibrate.toString().indexOf(searchTerms.hasReadingVibrate) !== -1
        && data.isMaskooni.toString().indexOf(searchTerms.isMaskooni) !== -1
        && data.isSaxt.toString().indexOf(searchTerms.isSaxt) !== -1
    }
    return filterFunction;
  }
}