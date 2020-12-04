import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IResponses } from 'src/app/Interfaces/iresponses';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { IDictionaryManager, ITrueFalse } from './../../../Interfaces/IDictionaryManager';
import { IZoneManager } from './../../../Interfaces/izone-manager';
import { SnackWrapperService } from './../../../services/snack-wrapper.service';
import { ZoneAddDgComponent } from './zone-add-dg/zone-add-dg.component';
import { ZoneEditDgComponent } from './zone-edit-dg/zone-edit-dg.component';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit, AfterViewInit, OnDestroy {
  titleFilter = new FormControl('');
  regionIdFilter = new FormControl('');
  logicalOrderFilter = new FormControl('');
  isMetroFilter = new FormControl('');

  subscription: Subscription
  dataSource = new MatTableDataSource();
  editableDataSource = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedValue;
  isTrueF: ITrueFalse[] = [
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
  ]
  zoneId: any[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  columnsToDisplay = ['title', 'regionId', 'logicalOrder', 'isMetro', 'actions'];
  filterValues = {
    title: '',
    regionId: '',
    logicalOrder: '',
    isMetro: ''
  };

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dialog: MatDialog,
    private snackWrapperService: SnackWrapperService,
    private interactionService: InteractionService,
    private router: Router
  ) { }

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
          console.log(result);

          this.interfaceManagerService.addZoneManager(result).subscribe((res: IResponses) => {
            if (res) {
              this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
            }
          })
        }
      });
    });
  }
  getEditableSource = (row: any) => {
    const a = this.editableDataSource.find(dataSource => {
      if (dataSource.id == row.id) {
        return dataSource.id;
      }
    })
    return a;
  }
  editDialog = (row: any) => {
    const editable = this.getEditableSource(row).regionId;
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ZoneEditDgComponent, {
        minWidth: '30rem',
        data: {
          row,
          editable,
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
      this.interfaceManagerService.deleteZoneManager(row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
        }
      });
    }
  }
  convertIdToTitle = (dataSource: any[], zoneDictionary: IDictionaryManager[]) => {
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
  filterSearchs = () => {

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

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
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.interactionService.saveDataForZone = null;
    }
    if (this.interactionService.saveDataForZone) {
      this.dataSource.data = this.interactionService.saveDataForZone;
      this.zoneDictionary = this.interactionService.saveDictionaryForZone;
    }
    else {
      this.dataSource.data = await this.getDataSource();
      this.zoneDictionary = await this.getZoneDictionary();
      this.interactionService.saveDataForZone = this.dataSource.data;
      this.interactionService.saveDictionaryForZone = this.zoneDictionary;
    }

    this.editableDataSource = JSON.parse(JSON.stringify(this.dataSource.data));

    this.convertIdToTitle(this.dataSource.data, this.zoneDictionary);

  }
  ngOnInit() {
    this.classWrapper();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.subscription = this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url)
          this.classWrapper(true);
      }
    })
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.unsubscribe();
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

