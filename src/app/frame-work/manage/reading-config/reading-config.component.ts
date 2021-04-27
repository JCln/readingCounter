import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
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
import { RdAddDgComponent } from './rd-add-dg/rd-add-dg.component';
import { RdEditDgComponent } from './rd-edit-dg/rd-edit-dg.component';


@Component({
  selector: 'app-reading-config',
  templateUrl: './reading-config.component.html',
  styleUrls: ['./reading-config.component.scss']
})
export class ReadingConfigComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];
  dataSource = new MatTableDataSource();
  editableDataSource = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // defaultHasPreNumberFilter = new FormControl('');
  isOnQeraatCodeFilter = new FormControl('');
  displayBillIdFilter = new FormControl('');
  displayRadifFilter = new FormControl('');
  zoneIdFilter = new FormControl('');
  defaultAlalHesabFilter = new FormControl('');
  maxAlalHesabFilter = new FormControl('');
  minAlalHesabFilter = new FormControl('');
  defaultImagePercentFilter = new FormControl('');
  maxImagePercentFilter = new FormControl('');
  minImagePercentFilter = new FormControl('');
  lowConstBoundMaskooniFilter = new FormControl('');
  lowPercentBoundMaskooniFilter = new FormControl('');
  highConstBoundMaskooniFilter = new FormControl('');
  highPercentBoundMaskooniFilter = new FormControl('');
  lowConstBoundSaxtFilter = new FormControl('');
  lowPercentBoundSaxtFilter = new FormControl('');
  highConstBoundSaxtFilter = new FormControl('');
  highPercentBoundSaxtFilter = new FormControl('');
  lowConstZarfiatBoundFilter = new FormControl('');
  lowPercentZarfiatBoundFilter = new FormControl('');
  highConstZarfiatBoundFilter = new FormControl('');
  highPercentZarfiatBoundFilter = new FormControl('');
  lowPercentRateBoundNonMaskooniFilter = new FormControl('');
  highPercentRateBoundNonMaskooniFilter = new FormControl('');

  selectedValue;
  isHide: boolean = true;
  isTrueF: ITrueFalse[] = [
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
  ]
  zoneId: any[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  columnsToDisplay = [
    // 'defaultHasPreNumber',
    'isOnQeraatCode',
    'displayBillId',
    'displayRadif',
    'zoneId',
    'defaultAlalHesab',
    'maxAlalHesab',
    'minAlalHesab',
    'defaultImagePercent',
    'maxImagePercent',
    'minImagePercent',
    'lowConstBoundMaskooni',
    'lowPercentBoundMaskooni',
    'highConstBoundMaskooni',
    'highPercentBoundMaskooni',
    'lowConstBoundSaxt',
    'lowPercentBoundSaxt',
    'highConstBoundSaxt',
    'highPercentBoundSaxt',
    'lowConstZarfiatBound',
    'lowPercentZarfiatBound',
    'highConstZarfiatBound',
    'highPercentZarfiatBound',
    'lowPercentRateBoundNonMaskooni',
    'highPercentRateBoundNonMaskooni',
    'actions'
  ];
  filterValues = {
    zoneId: '',
    defaultAlalHesab: '',
    maxAlalHesab: '',
    minAlalHesab: '',
    defaultImagePercent: '',
    maxImagePercent: '',
    minImagePercent: '',
    lowConstBoundMaskooni: '',
    lowPercentBoundMaskooni: '',
    highConstBoundMaskooni: '',
    highPercentBoundMaskooni: '',
    lowConstBoundSaxt: '',
    lowPercentBoundSaxt: '',
    highConstBoundSaxt: '',
    highPercentBoundSaxt: '',
    lowConstZarfiatBound: '',
    lowPercentZarfiatBound: '',
    highConstZarfiatBound: '',
    highPercentZarfiatBound: '',
    lowPercentRateBoundNonMaskooni: '',
    highPercentRateBoundNonMaskooni: '',
    // defaultHasPreNumber: '',
    isOnQeraatCode: '',
    displayBillId: '',
    displayRadif: ''
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
      const dialogRef = this.dialog.open(RdAddDgComponent, {
        minWidth: '30rem',
        data: {
          di: this.zoneDictionary
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result);

          this.interfaceManagerService.addReadingConfig(result).subscribe((res: IResponses) => {
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
      const dialogRef = this.dialog.open(RdEditDgComponent, {
        minWidth: '30rem',
        width: '100%',
        data: {
          row,
          editable,
          di: this.zoneDictionary
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editReadingConfig(result).subscribe((res: IResponses) => {
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
      this.interfaceManagerService.deleteReadingConfig(row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.threeMili, ENSnackBarColors.success);
        }
      });
    }
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getReadingConfig().subscribe(res => {
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

    this.zoneIdFilter.valueChanges
      .subscribe(
        zoneId => {
          this.filterValues.zoneId = zoneId;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.defaultAlalHesabFilter.valueChanges
      .subscribe(
        defaultAlalHesab => {
          this.filterValues.defaultAlalHesab = defaultAlalHesab;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.maxAlalHesabFilter.valueChanges
      .subscribe(
        maxAlalHesab => {
          this.filterValues.maxAlalHesab = maxAlalHesab;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.minAlalHesabFilter.valueChanges
      .subscribe(
        minAlalHesab => {
          this.filterValues.minAlalHesab = minAlalHesab;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.defaultImagePercentFilter.valueChanges
      .subscribe(
        defaultImagePercent => {
          this.filterValues.defaultImagePercent = defaultImagePercent;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.maxImagePercentFilter.valueChanges
      .subscribe(
        maxImagePercent => {
          this.filterValues.maxImagePercent = maxImagePercent;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.minImagePercentFilter.valueChanges
      .subscribe(
        minImagePercent => {
          this.filterValues.minImagePercent = minImagePercent;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.lowConstBoundMaskooniFilter.valueChanges
      .subscribe(
        lowConstBoundMaskooni => {
          this.filterValues.lowConstBoundMaskooni = lowConstBoundMaskooni;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.lowPercentBoundMaskooniFilter.valueChanges
      .subscribe(
        lowPercentBoundMaskooni => {
          this.filterValues.lowPercentBoundMaskooni = lowPercentBoundMaskooni;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.highConstBoundMaskooniFilter.valueChanges
      .subscribe(
        highConstBoundMaskooni => {
          this.filterValues.highConstBoundMaskooni = highConstBoundMaskooni;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.highPercentBoundMaskooniFilter.valueChanges
      .subscribe(
        highPercentBoundMaskooni => {
          this.filterValues.highPercentBoundMaskooni = highPercentBoundMaskooni;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.lowConstBoundSaxtFilter.valueChanges
      .subscribe(
        lowConstBoundSaxt => {
          this.filterValues.lowConstBoundSaxt = lowConstBoundSaxt;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.lowPercentBoundSaxtFilter.valueChanges
      .subscribe(
        lowPercentBoundSaxt => {
          this.filterValues.lowPercentBoundSaxt = lowPercentBoundSaxt;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.highConstBoundSaxtFilter.valueChanges
      .subscribe(
        highConstBoundSaxt => {
          this.filterValues.highConstBoundSaxt = highConstBoundSaxt;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.highPercentBoundSaxtFilter.valueChanges
      .subscribe(
        highPercentBoundSaxt => {
          this.filterValues.highPercentBoundSaxt = highPercentBoundSaxt;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.lowConstZarfiatBoundFilter.valueChanges
      .subscribe(
        lowConstZarfiatBound => {
          this.filterValues.lowConstZarfiatBound = lowConstZarfiatBound;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.lowPercentZarfiatBoundFilter.valueChanges
      .subscribe(
        lowPercentZarfiatBound => {
          this.filterValues.lowPercentZarfiatBound = lowPercentZarfiatBound;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.highConstZarfiatBoundFilter.valueChanges
      .subscribe(
        highConstZarfiatBound => {
          this.filterValues.highConstZarfiatBound = highConstZarfiatBound;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.highPercentZarfiatBoundFilter.valueChanges
      .subscribe(
        highPercentZarfiatBound => {
          this.filterValues.highPercentZarfiatBound = highPercentZarfiatBound;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.lowPercentRateBoundNonMaskooniFilter.valueChanges
      .subscribe(
        lowPercentRateBoundNonMaskooni => {
          this.filterValues.lowPercentRateBoundNonMaskooni = lowPercentRateBoundNonMaskooni;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.highPercentRateBoundNonMaskooniFilter.valueChanges
      .subscribe(
        highPercentRateBoundNonMaskooni => {
          this.filterValues.highPercentRateBoundNonMaskooni = highPercentRateBoundNonMaskooni;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    // this.defaultHasPreNumberFilter.valueChanges
    //   .subscribe(
    //     defaultHasPreNumber => {
    //       this.filterValues.defaultHasPreNumber = defaultHasPreNumber;
    //       this.dataSource.filter = JSON.stringify(this.filterValues);
    //     }
    //   )
    this.isOnQeraatCodeFilter.valueChanges
      .subscribe(
        isOnQeraatCode => {
          this.filterValues.isOnQeraatCode = isOnQeraatCode;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.displayBillIdFilter.valueChanges
      .subscribe(
        displayBillId => {
          this.filterValues.displayBillId = displayBillId;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.displayRadifFilter.valueChanges
      .subscribe(
        displayRadif => {
          this.filterValues.displayRadif = displayRadif;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  convertIdToTitle = (dataSource: any[], zoneDictionary: IDictionaryManager[]) => {
    zoneDictionary.map(zoneDic => {
      dataSource.map(dataSource => {
        if (zoneDic.id === dataSource.zoneId)
          dataSource.zoneId = zoneDic.title;
      })
    });
  }
  getZoneDictionary = (): any => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  nullSavedSource = () => this.closeTabService.saveDataForReadingConfig = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForReadingConfig) {
      this.dataSource.data = this.closeTabService.saveDataForReadingConfig;
      this.zoneDictionary = this.closeTabService.saveDictionaryForReadingConfig;
    }
    else {
      this.dataSource.data = await this.getDataSource();
      this.zoneDictionary = await this.getZoneDictionary();
      this.closeTabService.saveDataForReadingConfig = this.dataSource.data;
      this.closeTabService.saveDictionaryForReadingConfig = this.zoneDictionary;
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
        if (res === '/wr/m/rcd')
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

      return data.zoneId.toString().toLowerCase().indexOf(searchTerms.zoneId) !== -1
        && data.defaultAlalHesab.toString().toLowerCase().indexOf(searchTerms.defaultAlalHesab) !== -1
        && data.maxAlalHesab.toString().toLowerCase().indexOf(searchTerms.maxAlalHesab) !== -1
        && data.minAlalHesab.toString().toLowerCase().indexOf(searchTerms.minAlalHesab) !== -1
        && data.defaultImagePercent.toString().toLowerCase().indexOf(searchTerms.defaultImagePercent) !== -1
        && data.maxImagePercent.toString().toLowerCase().indexOf(searchTerms.maxImagePercent) !== -1
        && data.minImagePercent.toString().toLowerCase().indexOf(searchTerms.minImagePercent) !== -1
        && data.lowConstBoundMaskooni.toString().toLowerCase().indexOf(searchTerms.lowConstBoundMaskooni) !== -1
        && data.lowPercentBoundMaskooni.toString().toLowerCase().indexOf(searchTerms.lowPercentBoundMaskooni) !== -1
        && data.highConstBoundMaskooni.toString().toLowerCase().indexOf(searchTerms.highConstBoundMaskooni) !== -1
        && data.highPercentBoundMaskooni.toString().toLowerCase().indexOf(searchTerms.highPercentBoundMaskooni) !== -1
        && data.lowConstBoundSaxt.toString().toLowerCase().indexOf(searchTerms.lowConstBoundSaxt) !== -1
        && data.lowPercentBoundSaxt.toString().toLowerCase().indexOf(searchTerms.lowPercentBoundSaxt) !== -1
        && data.highConstBoundSaxt.toString().toLowerCase().indexOf(searchTerms.highConstBoundSaxt) !== -1
        && data.highPercentBoundSaxt.toString().toLowerCase().indexOf(searchTerms.highPercentBoundSaxt) !== -1
        && data.lowConstZarfiatBound.toString().toLowerCase().indexOf(searchTerms.lowConstZarfiatBound) !== -1
        && data.lowPercentZarfiatBound.toString().toLowerCase().indexOf(searchTerms.lowPercentZarfiatBound) !== -1
        && data.highConstZarfiatBound.toString().toLowerCase().indexOf(searchTerms.highConstZarfiatBound) !== -1
        && data.highPercentZarfiatBound.toString().toLowerCase().indexOf(searchTerms.highPercentZarfiatBound) !== -1
        && data.lowPercentRateBoundNonMaskooni.toString().toLowerCase().indexOf(searchTerms.lowPercentRateBoundNonMaskooni) !== -1
        && data.highPercentRateBoundNonMaskooni.toString().toLowerCase().indexOf(searchTerms.highPercentRateBoundNonMaskooni) !== -1
        // && data.defaultHasPreNumber.toString().indexOf(searchTerms.defaultHasPreNumber) !== -1
        && data.isOnQeraatCode.toString().indexOf(searchTerms.isOnQeraatCode) !== -1
        && data.displayBillId.toString().indexOf(searchTerms.displayBillId) !== -1
        && data.displayRadif.toString().indexOf(searchTerms.displayRadif) !== -1
    }
    return filterFunction;
  }
}