import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { ICountryManager } from 'src/app/Interfaces/imanage';
import { IDictionaryManager, IResponses } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { DictionaryWrapperService } from 'src/app/services/dictionary-wrapper.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { CountryAddDgComponent } from './country-add-dg/country-add-dg.component';
import { CountryEditDgComponent } from './country-edit-dg/country-edit-dg.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, AfterViewInit, OnDestroy {

  titleFilter = new FormControl('');
  dataSource = new MatTableDataSource();
  countryDictionary: IDictionaryManager[] = [];
  subscription: Subscription[] = [];
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
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  openDialog = () => {
    const dialogConfig = new MatDialogConfig();
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(CountryAddDgComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addCountryManager(result).subscribe((res: IResponses) => {
            if (res) {
              this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
            }
          })
        }
      });
    });
  }
  editDialog = (row: any) => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(CountryEditDgComponent, {
        width: '30rem',
        data: row

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editCountryManager(result).subscribe((res: IResponses) => {
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
  deleteSingleRow = async (row: ICountryManager) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      this.interfaceManagerService.deleteCountryManager(row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
        }
      });
    }
  }
  getCountryDictionary = (): any => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getCountryDictionary());
    });
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getCountryManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  filterSearchs = () => {
    this.dataSource.filterPredicate = this.createFilter();

    this.titleFilter.valueChanges
      .subscribe(
        title => {
          this.filterValues.title = title;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  nullSavedSource = () => this.closeTabService.saveDataForCountry = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForCountry) {
      this.dataSource.data = this.closeTabService.saveDataForCountry;
    }
    else {
      this.dataSource.data = await this.getDataSource();
      this.closeTabService.saveDataForCountry = this.dataSource.data;
    }

    this.filterSearchs();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/mc')
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
    }
    return filterFunction;
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}