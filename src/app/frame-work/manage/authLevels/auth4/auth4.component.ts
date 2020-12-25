import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { IProvinceManager } from 'src/app/Interfaces/iprovince-manager';
import { IResponses } from 'src/app/Interfaces/iresponses';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { CloseTabService } from './../../../../services/close-tab.service';
import { SnackWrapperService } from './../../../../services/snack-wrapper.service';
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
    private closeTabService: CloseTabService
  ) { }

  openDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(Auth4AddDgComponent, {
        minWidth: '30rem',
        data: {
          di: this.auth3Dictionary
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addAuthLevel4Manager(result).subscribe((res: IResponses) => {
            if (res) {
              this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
            }
          })
        }
      });
    });
  }
  editDialog = (row: any) => {
    console.log(this.auth3Dictionary);

    return new Promise(resolve => {
      const dialogRef = this.dialog.open(Auth4EditDgComponent, {
        width: '30rem',
        data: { row, di: this.auth3Dictionary }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editAuthLevel4Manager(result).subscribe(res => {
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
      this.interfaceManagerService.deleteAuthLevel4Manager(row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
        }
      });
    }
  }
  convertIdToTitle = (dataSource: any, dictionary: IDictionaryManager[]) => {
    dictionary.map(dic => {
      dataSource.map(dataSource => {
        if (dic.id === dataSource.authLevel3Id)
          dataSource.authLevel3Id = dic.title;
      })
    });
  }
  getAuthLevel4IdDictionary = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAuthLevel3DictionaryManager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAuthLevel4Manager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
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
      this.auth3Dictionary = this.closeTabService.saveDictionaryForAppLevel4;
    }
    else {
      this.dataSource.data = await this.getDataSource();
      this.auth3Dictionary = await this.getAuthLevel4IdDictionary();
      this.closeTabService.saveDataForAppLevel4 = this.dataSource.data;
      this.closeTabService.saveDictionaryForAppLevel4 = this.auth3Dictionary;
    }
    this.convertIdToTitle(this.dataSource.data, this.auth3Dictionary);
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