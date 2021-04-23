import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { IProvinceManager } from 'src/app/Interfaces/inon-manage';
import { ENSnackBarColors, ENSnackBarTimes, IDictionaryManager, IResponses } from 'src/app/Interfaces/ioverall-config';
import { AuthsManagerService } from 'src/app/services/auths-manager.service';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { Auth2AddDgComponent } from './auth2-add-dg/auth2-add-dg.component';
import { Auth2EditDgComponent } from './auth2-edit-dg/auth2-edit-dg.component';

@Component({
  selector: 'app-auth2',
  templateUrl: './auth2.component.html',
  styleUrls: ['./auth2.component.scss']
})
export class Auth2Component implements OnInit, AfterViewInit, OnDestroy {
  titleFilter = new FormControl('');
  authLevel1IdFilter = new FormControl('');

  dataSource = new MatTableDataSource();
  subscription: Subscription[] = [];

  auth1Dictionary: IDictionaryManager[] = [];
  columnsToDisplay = ['title', 'authLevel1Id', 'actions'];
  filterValues = {
    title: '',
    authLevel1Id: ''
  };

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dialog: MatDialog,
    private snackWrapperService: SnackWrapperService,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private authsManagerService: AuthsManagerService
  ) { }

  // add auth 2 not working
  openDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(Auth2AddDgComponent, {
        minWidth: '30rem',
        data: {
          di: this.auth1Dictionary
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addAuthLevel2Manager(result).subscribe((res: IResponses) => {
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
      const dialogRef = this.dialog.open(Auth2EditDgComponent, {
        width: '30rem',
        data: { row, di: this.auth1Dictionary }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editAuthLevel2Manager(result).subscribe((res: IResponses) => {
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
      this.interfaceManagerService.deleteAuthLevel2Manager(row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.threeMili, ENSnackBarColors.success);
        }
      });
    }
  }
  convertIdToTitle = (dataSource: any, zoneDictionary: IDictionaryManager[]) => {
    zoneDictionary.map(zoneDic => {
      dataSource.map(dataSource => {
        if (zoneDic.id === dataSource.id)
          dataSource.authLevel1Id = zoneDic.title;
      })
    });
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
    this.authLevel1IdFilter.valueChanges
      .subscribe(
        authLevel1Id => {
          this.filterValues.authLevel1Id = authLevel1Id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  nullSavedSource = () => this.closeTabService.saveDataForAppLevel2 = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh)
      this.nullSavedSource();
    if (this.closeTabService.saveDataForAppLevel2) {
      this.dataSource.data = this.closeTabService.saveDataForAppLevel2;
    }
    else {
      this.dataSource.data = await this.authsManagerService.getAuth2DataSource();
      this.closeTabService.saveDataForAppLevel2 = this.dataSource.data;
    }
    this.auth1Dictionary = await this.authsManagerService.getAuthLevel1Dictionary();
    this.convertIdToTitle(this.dataSource.data, this.auth1Dictionary);
    this.filter();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/al/me')
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
        && data.authLevel1Id.toLowerCase().indexOf(searchTerms.authLevel1Id) !== -1
    }
    return filterFunction;
  }
}