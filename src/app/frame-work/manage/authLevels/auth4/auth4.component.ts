import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IProvinceManager } from 'src/app/Interfaces/inon-manage';
import { ENSnackBarColors, ENSnackBarTimes, IDictionaryManager, IResponses } from 'src/app/Interfaces/ioverall-config';
import { AuthsManagerService } from 'src/app/services/auths-manager.service';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { Auth4AddDgComponent } from './auth4-add-dg/auth4-add-dg.component';
import { Auth4EditDgComponent } from './auth4-edit-dg/auth4-edit-dg.component';


@Component({
  selector: 'app-auth4',
  templateUrl: './auth4.component.html',
  styleUrls: ['./auth4.component.scss']
})
export class Auth4Component implements OnInit, AfterViewInit, OnDestroy {
  titleFilter = new FormControl('');
  authLevel3IdFilter = new FormControl('');

  dataSource = new MatTableDataSource();
  subscription: Subscription[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  auth3Dictionary: IDictionaryManager[] = [];
  editableDataSource = [];
  columnsToDisplay = ['title', 'authLevel3Id', 'actions'];
  filterValues = {
    title: '',
    authLevel3Id: ''
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
      const dialogRef = this.dialog.open(Auth4AddDgComponent, {
        disableClose: true,
        minWidth: '30rem',
        data: {
          di: this.auth3Dictionary
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.POSTBODY(ENInterfaces.AuthLevel4ADD, result).subscribe((res: IResponses) => {
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
    const editable = this.getEditableSource(row).authLevel2Id;
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(Auth4EditDgComponent, {
        disableClose: true,
        width: '30rem',
        data: { row, di: this.auth3Dictionary, editable }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.POSTBODY(ENInterfaces.AuthLevel4EDIT, result).subscribe(res => {
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
  deleteSingleRow = async (row: IProvinceManager) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      this.interfaceManagerService.POST(ENInterfaces.AuthLevel4REMOVE, row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.threeMili, ENSnackBarColors.success);
        }
      });
    }
  }

  filter = () => {
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
    this.authLevel3IdFilter.valueChanges
      .subscribe(
        authLevel3Id => {
          this.filterValues.authLevel3Id = authLevel3Id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  nullSavedSource = () => this.closeTabService.saveDataForAppLevel4 = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForAppLevel4) {
      this.dataSource.data = this.closeTabService.saveDataForAppLevel4;
    }
    else {
      this.dataSource.data = await this.authsManagerService.getAuth4DataSource();
      this.closeTabService.saveDataForAppLevel4 = this.dataSource.data;
    }
    this.auth3Dictionary = await this.authsManagerService.getAuthLevel3Dictionary();
    this.editableDataSource = JSON.parse(JSON.stringify(this.dataSource.data));
    this.authsManagerService.convertIdToTitle(this.dataSource.data, this.auth3Dictionary, 'authLevel3Id');
    this.filter();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/al/ac')
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
        && data.authLevel3Id.toString().toLowerCase().indexOf(searchTerms.authLevel3Id) !== -1
    }
    return filterFunction;
  }
}