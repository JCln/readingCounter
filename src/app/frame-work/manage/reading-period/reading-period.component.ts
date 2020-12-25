import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { IResponses } from 'src/app/Interfaces/iresponses';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { RpmAddDgComponent } from './rpm-add-dg/rpm-add-dg.component';
import { RpmEditDgComponent } from './rpm-edit-dg/rpm-edit-dg.component';

@Component({
  selector: 'app-reading-period',
  templateUrl: './reading-period.component.html',
  styleUrls: ['./reading-period.component.scss']
})
export class ReadingPeriodComponent implements OnInit, AfterViewInit, OnDestroy {
  titleFilter = new FormControl('');
  moshtarakinIdFilter = new FormControl('');
  readingPeriodKindIdFilter = new FormControl('');
  zoneIdFilter = new FormControl('');
  clientOrderFilter = new FormControl('');

  dataSource = new MatTableDataSource();

  subscription: Subscription[] = [];
  editableDataSource = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnsToDisplay = ['title', 'moshtarakinId', 'readingPeriodKindId', 'zoneId', 'clientOrder', 'actions'];
  zoneDictionary: IDictionaryManager[] = [];
  filterValues = {
    title: '',
    moshtarakinId: '',
    zoneId: '',
    readingPeriodKindId: '',
    clientOrder: ''
  };
  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dialog: MatDialog,
    private snackWrapperService: SnackWrapperService,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) { }

  openDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(RpmAddDgComponent,
        {
          width: '30rem',
          data: {
            di: this.zoneDictionary
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.AddReadingPeriodManager(result).subscribe((res: IResponses) => {
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
    const editable = this.getEditableSource(row).zoneId;
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(RpmEditDgComponent, {
        width: '30rem',
        data: {
          row,
          editable,
          di: this.zoneDictionary
        }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editReadingPeriodManager(result).subscribe((res: IResponses) => {
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
  deleteSingleRow = async (row: any) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      this.interfaceManagerService.deleteReadingPeriodManager(row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
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
      this.interfaceManagerService.getZoneDictionaryManager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }

  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getReadingPeriodManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  filterSearchs = () => {
    this.dataSource.paginator = this.paginator;
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
    this.clientOrderFilter.valueChanges
      .subscribe(
        clientOrder => {
          this.filterValues.clientOrder = clientOrder;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.readingPeriodKindIdFilter.valueChanges
      .subscribe(
        readingPeriodKindId => {
          this.filterValues.readingPeriodKindId = readingPeriodKindId;
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
  }
  nullSavedSource = () => this.closeTabService.saveDataForReadingPeriodManager = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForReadingPeriodManager) {
      this.dataSource.data = this.closeTabService.saveDataForReadingPeriodManager;
      this.zoneDictionary = this.closeTabService.saveDictionaryReadingPeriodManager;
    }
    else {
      this.dataSource.data = await this.getDataSource();
      this.zoneDictionary = await this.getZoneDictionary();
      this.closeTabService.saveDataForReadingPeriodManager = this.dataSource.data;
      this.closeTabService.saveDictionaryReadingPeriodManager = this.zoneDictionary;
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
        if (res === '/wr/m/rp')
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.moshtarakinId.toString().toLowerCase().indexOf(searchTerms.moshtarakinId) !== -1
        && data.zoneId.toString().toLowerCase().indexOf(searchTerms.zoneId) !== -1
        && data.clientOrder.toString().toLowerCase().indexOf(searchTerms.clientOrder) !== -1
        && data.readingPeriodKindId.toString().toLowerCase().indexOf(searchTerms.readingPeriodKindId) !== -1
    }
    return filterFunction;
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe())
  }
}