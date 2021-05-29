import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IZoneManager } from 'src/app/Interfaces/inon-manage';
import {
  ENSnackBarColors,
  ENSnackBarTimes,
  IDictionaryManager,
  IResponses,
  ITrueFalse,
} from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { DictionaryWrapperService } from 'src/app/services/dictionary-wrapper.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { KarbariAddDgComponent } from './karbari-add-dg/karbari-add-dg.component';
import { KarbariEditDgComponent } from './karbari-edit-dg/karbari-edit-dg.component';

@Component({
  selector: 'app-karbari',
  templateUrl: './karbari.component.html',
  styleUrls: ['./karbari.component.scss']
})
export class KarbariComponent implements OnInit, AfterViewInit, OnDestroy {
  titleFilter = new FormControl('');
  moshtarakinIdFilter = new FormControl('');
  provinceIdFilter = new FormControl('');
  hasReadingVibrateFilter = new FormControl('');
  isMaskooniFilter = new FormControl('');
  isSaxtFilter = new FormControl('');

  subscription: Subscription[] = [];
  dataSource = new MatTableDataSource();
  editableDataSource = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isTrueF: ITrueFalse[] = [
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
  ]
  zoneId: any[] = [];
  provinceDictionary: IDictionaryManager[] = [];

  columnsToDisplay = ['title', 'moshtarakinId', 'provinceId', 'hasReadingVibrate', 'isMaskooni', 'isSaxt', 'actions'];
  filterValues = {
    title: '',
    moshtarakinId: '',
    provinceId: '',
    hasReadingVibrate: '',
    isMaskooni: '',
    isSaxt: ''
  };

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dialog: MatDialog,
    private snackWrapperService: SnackWrapperService,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  openDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(KarbariAddDgComponent, {
        disableClose: true,
        width: '30rem',
        data: {
          di: this.provinceDictionary
        }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.POSTBODY(ENInterfaces.KarbariAdd, result).subscribe((res: IResponses) => {
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
    const editable = this.getEditableSource(row).provinceId;
    const dialogRef = this.dialog.open(KarbariEditDgComponent, {
      disableClose: true,
      width: '30rem',
      data: {
        row,
        editable,
        di: this.provinceDictionary
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.interfaceManagerService.POSTBODY(ENInterfaces.KarbariEdit, result).subscribe((res: IResponses) => {
          if (res) {
            this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.threeMili, ENSnackBarColors.success);
          }
        })
      }
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
      this.interfaceManagerService.POST(ENInterfaces.KarbariRemove, row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.threeMili, ENSnackBarColors.success);
        }
      });
    }
  }
  convertIdToTitle = (dataSource: any, zoneDictionary: IDictionaryManager[]) => {
    dataSource.map(dataSource => {
      zoneDictionary.map(zoneDic => {
        if (zoneDic.id === dataSource.provinceId)
          dataSource.provinceId = zoneDic.title;
      })
    });
  }
  getProvinceDictionary = (): any => {
    return this.dictionaryWrapperService.getProvinceDictionary();
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.KarbariAll).subscribe(res => {
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
  nullSavedSource = () => this.closeTabService.saveDataForKarbari = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForKarbari) {
      this.dataSource.data = this.closeTabService.saveDataForKarbari;
    }
    else {
      this.dataSource.data = await this.getDataSource();
      this.closeTabService.saveDataForKarbari = this.dataSource.data;
    }
    this.provinceDictionary = await this.getProvinceDictionary();
    this.editableDataSource = JSON.parse(JSON.stringify(this.dataSource.data));

    this.convertIdToTitle(this.dataSource.data, this.provinceDictionary);
    this.filterSearchs();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/r/kar')
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
        && data.moshtarakinId.toString().toLowerCase().indexOf(searchTerms.moshtarakinId) !== -1
        && data.provinceId.toString().toLowerCase().indexOf(searchTerms.provinceId) !== -1
        && data.hasReadingVibrate.toString().indexOf(searchTerms.hasReadingVibrate) !== -1
        && data.isMaskooni.toString().indexOf(searchTerms.isMaskooni) !== -1
        && data.isSaxt.toString().indexOf(searchTerms.isSaxt) !== -1
    }
    return filterFunction;
  }
}