import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
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

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { CrAddDgComponent } from './cr-add-dg/cr-add-dg.component';
import { CrEditDgComponent } from './cr-edit-dg/cr-edit-dg.component';

@Component({
  selector: 'app-counter-report',
  templateUrl: './counter-report.component.html',
  styleUrls: ['./counter-report.component.scss']
})
export class CounterReportComponent implements OnInit, AfterViewInit, OnDestroy {
  moshtarakinIdFilter = new FormControl('');
  titleFilter = new FormControl('');
  zoneIdFilter = new FormControl('');
  isAhadFilter = new FormControl('');
  isKarbariFilter = new FormControl('');
  canNumberBeLessThanPreFilter = new FormControl('');
  isTaviziFilter = new FormControl('');
  clientOrderFilter = new FormControl('');

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
  zoneDictionary: IDictionaryManager[] = [];

  columnsToDisplay = ['moshtarakinId', 'title', 'zoneId', 'isAhad', 'isKarbari', 'canNumberBeLessThanPre', 'isTavizi', 'clientOrder', 'actions'];
  filterValues = {
    moshtarakinId: '',
    title: '',
    zoneId: '',
    isAhad: '',
    isKarbari: '',
    canNumberBeLessThanPre: '',
    isTavizi: '',
    clientOrder: '',
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
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(CrAddDgComponent, {
        minWidth: '30rem',
        data: {
          di: this.zoneDictionary
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result);

          this.interfaceManagerService.addCounterReport(result).subscribe((res: IResponses) => {
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
    const editable = this.getEditableSource(row).zoneId;
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(CrEditDgComponent, {
        minWidth: '30rem',
        data: {
          row,
          editable,
          di: this.zoneDictionary
        }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editCounterReport(result).subscribe((res: IResponses) => {
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
  deleteSingleRow = async (row: any) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      this.interfaceManagerService.deleteCounterReport(row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.threeMili, ENSnackBarColors.success);
        }
      });
    }
  }
  convertIdToTitle = (dataSource: any[], zoneDictionary: IDictionaryManager[]) => {
    dataSource.map(dataSource => {
      zoneDictionary.map(zoneDic => {
        if (zoneDic.id === dataSource.zoneId)
          dataSource.zoneId = zoneDic.title;
      })
    });
  }
  getZoneDictionary = (): any => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getZoneDictionary());
    });
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getCounterReport().subscribe(res => {
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

    this.moshtarakinIdFilter.valueChanges
      .subscribe(
        moshtarakinId => {
          this.filterValues.moshtarakinId = moshtarakinId;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.titleFilter.valueChanges
      .subscribe(
        title => {
          this.filterValues.title = title;
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
    this.isAhadFilter.valueChanges
      .subscribe(
        isAhad => {
          this.filterValues.isAhad = isAhad;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.isKarbariFilter.valueChanges
      .subscribe(
        isKarbari => {
          this.filterValues.isKarbari = isKarbari;
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
    this.clientOrderFilter.valueChanges
      .subscribe(
        clientOrder => {
          this.filterValues.clientOrder = clientOrder;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  nullSavedSource = () => this.closeTabService.saveDataForCounterReport = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForCounterReport) {
      this.dataSource.data = this.closeTabService.saveDataForZone;
      this.zoneDictionary = this.closeTabService.saveDataForCounterReport;
    }
    else {
      this.dataSource.data = await this.getDataSource();
      this.zoneDictionary = await this.getZoneDictionary();
      this.closeTabService.saveDataForZone = this.dataSource.data;
      this.closeTabService.saveDataForCounterReport = this.zoneDictionary;
    }

    this.editableDataSource = JSON.parse(JSON.stringify(this.dataSource.data));

    this.convertIdToTitle(this.dataSource.data, this.zoneDictionary);
    this.filterSearchs();

  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/cr')
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
        && data.zoneId.toString().toLowerCase().indexOf(searchTerms.zoneId) !== -1
        && data.clientOrder.toString().toLowerCase().indexOf(searchTerms.clientOrder) !== -1
        && data.moshtarakinId.toString().toLowerCase().indexOf(searchTerms.moshtarakinId) !== -1
        && data.isTavizi.toString().indexOf(searchTerms.isTavizi) !== -1
        && data.isKarbari.toString().indexOf(searchTerms.isKarbari) !== -1
        && data.isAhad.toString().indexOf(searchTerms.isAhad) !== -1
        && data.canNumberBeLessThanPre.toString().indexOf(searchTerms.canNumberBeLessThanPre) !== -1
    }
    return filterFunction;
  }
}