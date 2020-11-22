import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IResponses } from 'src/app/Interfaces/iresponses';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { IDictionaryManager } from './../../../Interfaces/IDictionaryManager';
import { IZoneManager } from './../../../Interfaces/izone-manager';
import { SnackWrapperService } from './../../../services/snack-wrapper.service';
import { ZoneAddDgComponent } from './zone-add-dg/zone-add-dg.component';
import { ZoneEditDgComponent } from './zone-edit-dg/zone-edit-dg.component';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {
  titleFilter = new FormControl('');
  regionIdFilter = new FormControl('');
  logicalOrderFilter = new FormControl('');
  isMetroFilter = new FormControl('');
  dataSource = new MatTableDataSource();

  selectedValue;
  items: string[] = ['شهری', 'غیرشهری'];
  zoneId: any[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  columnsToDisplay = ['title', 'regionId', 'logicalOrder', 'isMetro', 'actions'];
  filterValues = {
    title: '',
    regionId: '',
    logicalOrder: '',
    isMetro: ''
  };

  constructor(private interfaceManagerService: InterfaceManagerService, private dialog: MatDialog, private snackWrapperService: SnackWrapperService) { }

  openDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ZoneAddDgComponent, {
        minWidth: '30rem',
        data: {
          di: this.zoneDictionary
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addZoneManager(result.value).subscribe((res: IResponses) => {
            if (res) {
              this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
            }
          })
        }
      });
    });
  }
  editDialog = (row: any) => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ZoneEditDgComponent, {
        minWidth: '30rem',
        data: {
          row,
          di: this.zoneDictionary
        }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editZoneManager(result).subscribe((res: IResponses) => {
            if (res) {
              this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
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
        this.interfaceManagerService.deleteZoneManager(row.id).subscribe(res => {
          if (res) {
            resolve(res);
          }
        });
      });
    }
  }
  convertIdToTitle = (dataSource: IZoneManager[], zoneDictionary: IDictionaryManager[]) => {
    dataSource.map(dataSource => {
      zoneDictionary.map(zoneDic => {
        if (zoneDic.id === dataSource.regionId)
          dataSource.regionId = zoneDic.title;
      })
    });
  }
  getZoneDictionary = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getRegionDictionaryManager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getZoneManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  classWrapper = async () => {
    const rolesData = await this.getDataSource();

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
      this.regionIdFilter.valueChanges
        .subscribe(
          regionId => {
            this.filterValues.regionId = regionId;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.isMetroFilter.valueChanges
        .subscribe(
          isMetro => {
            this.filterValues.isMetro = isMetro;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.logicalOrderFilter.valueChanges
        .subscribe(
          logicalOrder => {
            this.filterValues.logicalOrder = logicalOrder;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
    }

    const zoneDictionary = await this.getZoneDictionary();

    this.zoneDictionary = zoneDictionary;

    this.convertIdToTitle(rolesData, zoneDictionary);

  }
  ngOnInit() {
    this.classWrapper();
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);

      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.regionId.toString().toLowerCase().indexOf(searchTerms.regionId) !== -1
        && data.logicalOrder.toString().toLowerCase().indexOf(searchTerms.logicalOrder) !== -1
        && data.isMetro.toString().indexOf(searchTerms.isMetro) !== -1
    }
    return filterFunction;
  }
}

