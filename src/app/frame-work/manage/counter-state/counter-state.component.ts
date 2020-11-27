import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ICounterState } from './../../../Interfaces/icounter-state';
import { ITrueFalse } from './../../../Interfaces/IDictionaryManager';
import { InteractionService } from './../../../services/interaction.service';
import { CounterStateAddDgComponent } from './counter-state-add-dg/counter-state-add-dg.component';
import { CounterStateEditDgComponent } from './counter-state-edit-dg/counter-state-edit-dg.component';

@Component({
  selector: 'app-counter-state',
  templateUrl: './counter-state.component.html',
  styleUrls: ['./counter-state.component.scss']
})
export class CounterStateComponent implements OnInit, AfterViewInit {
  titleFilter = new FormControl('');
  moshtarakinIdFilter = new FormControl('');
  zoneIdFilter = new FormControl('');
  clientOrderFilter = new FormControl('');
  canEnterNumberFilter = new FormControl('');
  isManeFilter = new FormControl('');
  canNumberBeLessThanPreFilter = new FormControl('');
  isTaviziFilter = new FormControl('');
  shouldEnterNumberFilter = new FormControl('');
  isXarabFilter = new FormControl('');
  isFaqedFilter = new FormControl('');

  zoneDictionary: IDictionaryManager[] = []

  subscription: Subscription
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isTrueF: ITrueFalse[] = [
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
  ]

  columnsToDisplay = [
    'title',
    'moshtarakinId',
    'zoneId',
    'clientOrder',
    'canEnterNumber',
    'isMane',
    'canNumberBeLessThanPre',
    'isTavizi',
    'shouldEnterNumber',
    'isXarab',
    'isFaqed',
    'actions'
  ];
  filterValues = {
    title: '',
    moshtarakinId: '',
    zoneId: '',
    clientOrder: '',
    canEnterNumber: '',
    isMane: '',
    canNumberBeLessThanPre: '',
    isTavizi: '',
    shouldEnterNumber: '',
    isXarab: '',
    isFaqed: '',
  };

  constructor(private interfaceManagerService: InterfaceManagerService, private dialog: MatDialog, private interactionService: InteractionService, private router: Router) { }

  openDialog = () => {
    const dialogRef = this.dialog.open(CounterStateAddDgComponent, {
      width: '30rem',
      data: {
        di: this.zoneDictionary
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result) {
        this.interfaceManagerService.addCounterState(result).subscribe(res => {
          if (res) {
            console.log(res);

          }
        })
      }
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
  editDialog = (row: any) => {
    const dialogRef = this.dialog.open(CounterStateEditDgComponent, {
      width: '30rem',
      data: {
        row,
        di: this.zoneDictionary
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.interfaceManagerService.editCounterState(result).subscribe(res => {
          if (res) {
            console.log(res);

          }
        })
      }
    });
  }
  deleteSingleRow = async (row: ICounterState) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      return new Promise((resolve) => {
        this.interfaceManagerService.deleteCounterState(row.id).subscribe(res => {
          if (res) {
            resolve(res);
          }
        });
      });
    }
  }
  convertIdToTitle = (dataSource: any, zoneDictionary: IDictionaryManager[]) => {
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
      this.interfaceManagerService.getCounterState().subscribe((res: ICounterState[]) => {
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
    this.zoneIdFilter.valueChanges
      .subscribe(
        zoneId => {
          this.filterValues.zoneId = zoneId;
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
    this.canEnterNumberFilter.valueChanges
      .subscribe(
        canEnterNumber => {
          this.filterValues.canEnterNumber = canEnterNumber;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.isManeFilter.valueChanges
      .subscribe(
        isMane => {
          this.filterValues.isMane = isMane;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.canNumberBeLessThanPreFilter.valueChanges
      .subscribe(
        canNumberBeLessThanPre => {
          this.filterValues.canNumberBeLessThanPre = canNumberBeLessThanPre;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.isTaviziFilter.valueChanges
      .subscribe(
        isTavizi => {
          this.filterValues.isTavizi = isTavizi;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.shouldEnterNumberFilter.valueChanges
      .subscribe(
        shouldEnterNumber => {
          this.filterValues.shouldEnterNumber = shouldEnterNumber;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.isXarabFilter.valueChanges
      .subscribe(
        isXarab => {
          this.filterValues.isXarab = isXarab;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.isFaqedFilter.valueChanges
      .subscribe(
        isFaqed => {
          this.filterValues.isFaqed = isFaqed;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  classWrapper = async () => {
    const rolesData = await this.getDataSource();

    if (rolesData) {
      this.dataSource.data = rolesData;
      const zoneDictionary = await this.getZoneDictionary();

      this.zoneDictionary = zoneDictionary;
      this.convertIdToTitle(rolesData, zoneDictionary);

      this.dataSource.filterPredicate = this.createFilter();
      this.filterSearchs();
    }
  }
  ngOnInit() {
    this.classWrapper();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.subscription = this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url)
          this.ngOnInit();
      }
    })
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.moshtarakinId.toString().toLowerCase().indexOf(searchTerms.moshtarakinId) !== -1
        && data.zoneId.toLowerCase().indexOf(searchTerms.zoneId) !== -1
        && data.clientOrder.toString().toLowerCase().indexOf(searchTerms.clientOrder) !== -1
        && data.canEnterNumber.toString().toLowerCase().indexOf(searchTerms.canEnterNumber) !== -1
        && data.isMane.toString().toLowerCase().indexOf(searchTerms.isMane) !== -1
        && data.canNumberBeLessThanPre.toString().toLowerCase().indexOf(searchTerms.canNumberBeLessThanPre) !== -1
        && data.isTavizi.toString().toLowerCase().indexOf(searchTerms.isTavizi) !== -1
        && data.shouldEnterNumber.toString().toLowerCase().indexOf(searchTerms.shouldEnterNumber) !== -1
        && data.isXarab.toString().toLowerCase().indexOf(searchTerms.isXarab) !== -1
        && data.isFaqed.toString().toLowerCase().indexOf(searchTerms.isFaqed) !== -1
    }
    return filterFunction;
  }
}

