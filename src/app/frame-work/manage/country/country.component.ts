import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IResponses } from 'src/app/Interfaces/iresponses';
import { InteractionService } from 'src/app/services/interaction.service';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ICountryManager } from './../../../Interfaces/icountry-manager';
import { IDictionaryManager } from './../../../Interfaces/IDictionaryManager';
import { InterfaceManagerService } from './../../../services/interface-manager.service';
import { SnackWrapperService } from './../../../services/snack-wrapper.service';
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
    private router: Router
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
      this.interfaceManagerService.getCountryDictionaryManager().subscribe(res => {
        if (res)
          resolve(res);
      })
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
  nullSavedSource = () => this.interactionService.saveDataForCountry = null;
  closeTabStatus = () => {
    this.subscription.push(this.interactionService.getClosedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url) {
          this.nullSavedSource();
        }
      }
    })
    )
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.interactionService.saveDataForCountry) {
      this.dataSource.data = this.interactionService.saveDataForCountry;
    }
    else {
      this.dataSource.data = await this.getDataSource();
      this.interactionService.saveDataForCountry = this.dataSource.data;
    }

    this.filterSearchs();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url)
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
    this.closeTabStatus();
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