import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { IProvinceManager } from 'src/app/Interfaces/inon-manage';
import { ENSnackBarColors, ENSnackBarTimes, IDictionaryManager, IResponses } from 'src/app/Interfaces/ioverall-config';
import { AuthsManagerService } from 'src/app/services/auths-manager.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { CloseTabService } from './../../../../services/close-tab.service';
import { SnackWrapperService } from './../../../../services/snack-wrapper.service';
import { Auth1AddDgComponent } from './auth1-add-dg/auth1-add-dg.component';
import { Auth1EditDgComponent } from './auth1-edit-dg/auth1-edit-dg.component';


@Component({
  selector: 'app-auth1',
  templateUrl: './auth1.component.html',
  styleUrls: ['./auth1.component.scss']
})
export class Auth1Component implements OnInit, AfterViewInit, OnDestroy {
  titleFilter = new FormControl('');

  dataSource = new MatTableDataSource();
  subscription: Subscription[] = [];

  provinceDictionary: IDictionaryManager[] = [];
  columnsToDisplay = ['title', 'actions'];
  filterValues = {
    title: ''
  };

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dialog: MatDialog,
    private snackWrapperService: SnackWrapperService,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private authsManagerService: AuthsManagerService
  ) { }

  openDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(Auth1AddDgComponent, { disableClose: true });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addAuthLevel1Manager(result).subscribe((res: IResponses) => {
            if (res) {
              this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.threeMili, ENSnackBarColors.success);
            }
          })
        }
      });
    });
  }
  editDialog = (row: any) => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(Auth1EditDgComponent, {
        width: '30rem',
        data: row,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editAuthLevel1Manager(result).subscribe((res: IResponses) => {
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
  deleteSingleRow = async (row: IProvinceManager) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      this.interfaceManagerService.deleteAuthLevel1Manager(row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.threeMili, ENSnackBarColors.success);
        }
      });
    }
  }
  filter = () => {
    this.dataSource.filterPredicate = this.createFilter();

    this.titleFilter.valueChanges
      .subscribe(
        title => {
          this.filterValues.title = title;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  nullSavedSource = () => this.closeTabService.saveDataForAppLevel1 = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForAppLevel1)
      this.dataSource.data = this.closeTabService.saveDataForAppLevel1;
    else {
      this.dataSource.data = await this.authsManagerService.getAuth1DataSource();
      this.closeTabService.saveDataForAppLevel1 = this.dataSource.data;
    }
    this.filter();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/al/ap')
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
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
    }
    return filterFunction;
  }
}