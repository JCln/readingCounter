import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IZoneBoundManager } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { SectorsManagerService } from 'src/app/services/sectors-manager.service';

import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { ZoneBoundAddDgComponent } from './zone-bound-add-dg/zone-bound-add-dg.component';
import { ZoneBoundEditDgComponent } from './zone-bound-edit-dg/zone-bound-edit-dg.component';

@Component({
  selector: 'app-zone-bound',
  templateUrl: './zone-bound.component.html',
  styleUrls: ['./zone-bound.component.scss']
})
export class ZoneBoundComponent implements OnInit, AfterViewInit, OnDestroy {

  titleFilter = new FormControl('');
  zoneIdFilter = new FormControl('');
  govermentalCodeFilter = new FormControl('');
  fromEshterakFilter = new FormControl('');
  toEshterakFilter = new FormControl('');
  fromRadifFilter = new FormControl('');
  toRadifFilter = new FormControl('');
  dbInitialCatalogFilter = new FormControl('');

  zoneBoundDictionary: IDictionaryManager[] = [];
  dataSource = new MatTableDataSource();
  editableDataSource = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subscription: Subscription[] = [];

  columnsToDisplay = ['title', 'zoneId', 'fromEshterak', 'toEshterak', 'actions'];
  filterValues = {
    title: '',
    zoneId: '',
    govermentalCode: '',
    fromEshterak: '',
    toEshterak: '',
    fromRadif: '',
    toRadif: '',
    dbInitialCatalog: '',
  };

  constructor(
    private dialog: MatDialog,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private sectorsManagerService: SectorsManagerService
  ) { }

  openDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(ZoneBoundAddDgComponent, {
        disableClose: true,
        data: {
          di: this.zoneBoundDictionary
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sectorsManagerService.sectorsAddEdit(ENInterfaces.ZoneBoundADD, result.value);
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
    return new Promise(() => {
      const dialogRef = this.dialog.open(ZoneBoundEditDgComponent, {
        disableClose: true,
        width: '30rem',
        data: {
          row,
          editable,
          di: this.zoneBoundDictionary
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sectorsManagerService.sectorsAddEdit(ENInterfaces.ZoneBoundEDIT, result.value);
        }
      });
    });
  }
  deleteSingleRow = async (row: IZoneBoundManager) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      this.sectorsManagerService.sectorsDelete(ENInterfaces.ZoneBoundREMOVE, row.id);
    }
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
    this.zoneIdFilter.valueChanges
      .subscribe(
        zoneId => {
          this.filterValues.zoneId = zoneId;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.govermentalCodeFilter.valueChanges
      .subscribe(
        govermentalCode => {
          this.filterValues.govermentalCode = govermentalCode;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.fromEshterakFilter.valueChanges
      .subscribe(
        fromEshterak => {
          this.filterValues.fromEshterak = fromEshterak;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.toEshterakFilter.valueChanges
      .subscribe(
        toEshterak => {
          this.filterValues.toEshterak = toEshterak;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    this.toRadifFilter.valueChanges
      .subscribe(
        toRadif => {
          this.filterValues.toRadif = toRadif;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.dbInitialCatalogFilter.valueChanges
      .subscribe(
        dbInitialCatalog => {
          this.filterValues.dbInitialCatalog = dbInitialCatalog;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  nullSavedSource = () => this.closeTabService.saveDataForZoneBound = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForZoneBound) {
      this.dataSource.data = this.closeTabService.saveDataForZoneBound;
    }
    else {
      this.dataSource.data = await this.sectorsManagerService.getZoneBoundDataSource();
      this.closeTabService.saveDataForZoneBound = this.dataSource.data;
    }
    this.zoneBoundDictionary = await this.sectorsManagerService.getZoneDictionary();
    this.editableDataSource = JSON.parse(JSON.stringify(this.dataSource.data));

    this.sectorsManagerService.convertIdToTitle(this.zoneBoundDictionary, this.zoneBoundDictionary, 'zoneId');
    this.filterSearchs();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/zs/zd')
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
        && data.zoneId.toString().toLowerCase().indexOf(searchTerms.zoneId) !== -1
        && data.govermentalCode.toLowerCase().indexOf(searchTerms.govermentalCode) !== -1
        && data.fromEshterak.toLowerCase().indexOf(searchTerms.fromEshterak) !== -1
        && data.toEshterak.toLowerCase().indexOf(searchTerms.toEshterak) !== -1
        && data.fromRadif.toString().toLowerCase().indexOf(searchTerms.fromRadif) !== -1
        && data.toRadif.toString().toLowerCase().indexOf(searchTerms.toRadif) !== -1
        && data.dbInitialCatalog.toLowerCase().indexOf(searchTerms.dbInitialCatalog) !== -1
    }
    return filterFunction;
  }
}