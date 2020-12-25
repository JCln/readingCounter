import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ITrueFalse } from 'src/app/Interfaces/IDictionaryManager';
import { IResponses } from 'src/app/Interfaces/iresponses';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { RpkmAddDgComponent } from './rpkm-add-dg/rpkm-add-dg.component';
import { RpkmEditDgComponent } from './rpkm-edit-dg/rpkm-edit-dg.component';

@Component({
  selector: 'app-reading-period-kind',
  templateUrl: './reading-period-kind.component.html',
  styleUrls: ['./reading-period-kind.component.scss']
})
export class ReadingPeriodKindComponent implements OnInit, AfterViewInit, OnDestroy {
  titleFilter = new FormControl('');
  moshtarakinIdFilter = new FormControl('');
  clientOrderFilter = new FormControl('');
  isEnabledFilter = new FormControl('');

  dataSource = new MatTableDataSource();

  subscription: Subscription[] = [];
  isTrueF: ITrueFalse[] = [
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
  ]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnsToDisplay = ['title', 'moshtarakinId', 'clientOrder', 'isEnabled', 'actions'];
  filterValues = {
    title: '',
    moshtarakinId: '',
    clientOrder: '',
    isEnabled: ''
  };

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dialog: MatDialog,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) { }

  openDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(RpkmAddDgComponent,
        {
          width: '30rem'
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);

        if (result) {
          this.interfaceManagerService.AddReadingPeriodKindManager(result).subscribe((res: IResponses) => {
            if (res) {
              console.log(res);

              // this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
            }
          })
        }
      });
    });
  }
  editDialog = (row: any) => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(RpkmEditDgComponent, {
        width: '30rem',
        data: {
          row
        }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editReadingPeriodKindManager(result).subscribe((res: IResponses) => {
            if (res) {
              console.log(res);

              // this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
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
      this.interfaceManagerService.deleteReadingPeriodKindManager(row.id).subscribe(res => {
        if (res) {
          console.log(res);

          // this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
        }
      });
    }
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getReadingPeriodKindManager().subscribe(res => {
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
    this.isEnabledFilter.valueChanges
      .subscribe(
        isEnabled => {
          this.filterValues.isEnabled = isEnabled;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  nullSavedSource = () => this.closeTabService.saveDataForReadingPeriodKindManager = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForReadingPeriodKindManager) {
      this.dataSource.data = this.closeTabService.saveDataForReadingPeriodKindManager;
    }
    else {
      this.dataSource.data = await this.getDataSource();
      this.closeTabService.saveDataForReadingPeriodKindManager = this.dataSource.data;
    }
    this.filterSearchs();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/rpkm')
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
        && data.clientOrder.toString().toLowerCase().indexOf(searchTerms.clientOrder) !== -1
        && data.isEnabled.toString().indexOf(searchTerms.isEnabled) !== -1
    }
    return filterFunction;
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe())
  }
}