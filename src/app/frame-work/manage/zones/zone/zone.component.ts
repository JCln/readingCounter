import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { IZoneManager } from 'src/app/Interfaces/imanage';
import {
  ENSnackBarColors,
  ENSnackBarTimes,
  IDictionaryManager,
  IResponses,
  ITrueFalse,
} from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { SectorsManagerService } from 'src/app/services/sectors-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
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

  subscription: Subscription[] = [];
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
    private closeTabService: CloseTabService,
    private sectorsManagerService: SectorsManagerService
  ) { }

  openDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ZoneAddDgComponent, {
        disableClose: true,
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
              this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.threeMili, ENSnackBarColors.success);
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
        disableClose: true,
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
              this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.threeMili, ENSnackBarColors.success);
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
          this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.threeMili, ENSnackBarColors.success);
        }
      });
    }
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
  nullSavedSource = () => this.closeTabService.saveDataForZone = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForZone) {
      this.dataSource.data = this.closeTabService.saveDataForZone;
    }
    else {
      this.dataSource.data = await this.sectorsManagerService.getZoneDataSource();
      this.closeTabService.saveDataForZone = this.dataSource.data;
    }
    this.zoneDictionary = await this.sectorsManagerService.getRegionDictionary();
    this.editableDataSource = JSON.parse(JSON.stringify(this.dataSource.data));

    this.sectorsManagerService.convertIdToTitle(this.dataSource.data, this.zoneDictionary, 'regionId');
    this.filterSearchs();

  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/zs/z')
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
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

