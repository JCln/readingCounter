import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { IResponses } from 'src/app/Interfaces/iresponses';
import { IZoneManager } from 'src/app/Interfaces/izone-manager';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { SnackWrapperService } from './../../../services/snack-wrapper.service';
import { KarbariAddDgComponent } from './karbari-add-dg/karbari-add-dg.component';
import { KarbariEditDgComponent } from './karbari-edit-dg/karbari-edit-dg.component';

interface trueFalse {
  name: string;
  value: string | boolean;

}
@Component({
  selector: 'app-karbari',
  templateUrl: './karbari.component.html',
  styleUrls: ['./karbari.component.scss']
})
export class KarbariComponent implements OnInit, AfterViewInit, OnDestroy {
  titleFilter = new FormControl('');
  moshtarakinIdFilter = new FormControl('');
  provinceIdFilter = new FormControl('');
  hasReadingVibrateFilter = new FormControl('');
  isMaskooniFilter = new FormControl('');
  isSaxtFilter = new FormControl('');

  subscription: Subscription;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isTrueF: trueFalse[] = [
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
  ]
  zoneId: any[] = [];
  provinceDictionary: IDictionaryManager[] = [];

  columnsToDisplay = ['title', 'moshtarakinId', 'provinceId', 'hasReadingVibrate', 'isMaskooni', 'isSaxt', 'actions'];
  filterValues = {
    title: '',
    moshtarakinId: '',
    provinceId: '',
    hasReadingVibrate: '',
    isMaskooni: '',
    isSaxt: ''
  };

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dialog: MatDialog,
    private snackWrapperService: SnackWrapperService,
    private interactionService: InteractionService,
    private router: Router
  ) { }

  openDialog = () => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(KarbariAddDgComponent, {
        width: '30rem',
        data: {
          di: this.provinceDictionary
        }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.addKarbari(result.value).subscribe((res: IResponses) => {
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
      const dialogRef = this.dialog.open(KarbariEditDgComponent, {
        width: '30rem',
        data: {
          row,
          di: this.provinceDictionary
        }

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.interfaceManagerService.editKarbari(result).subscribe((res: IResponses) => {
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
  deleteSingleRow = async (row: IZoneManager) => {
    const dialogResult = await this.deleteDialog();
    if (dialogResult) {
      this.interfaceManagerService.deleteKarbari(row.id).subscribe(res => {
        if (res) {
          this.snackWrapperService.openSnackBar(res.message, 3000, 'snack_success');
        }
      });
    }
  }
  convertIdToTitle = (dataSource: any, zoneDictionary: IDictionaryManager[]) => {
    dataSource.map(dataSource => {
      zoneDictionary.map(zoneDic => {
        if (zoneDic.title === dataSource.provinceId)
          dataSource.provinceId = zoneDic.title;
      })
    });
  }
  getProvinceDictionary = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getProvinceDictionaryManager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }
  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getKarbari().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  classWrapper = async () => {
    const rolesData = await this.getDataSource();

    if (rolesData) {
      this.dataSource.data = rolesData;
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
      this.provinceIdFilter.valueChanges
        .subscribe(
          provinceId => {
            this.filterValues.provinceId = provinceId;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.hasReadingVibrateFilter.valueChanges
        .subscribe(
          hasReadingVibrate => {
            this.filterValues.hasReadingVibrate = hasReadingVibrate;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.isMaskooniFilter.valueChanges
        .subscribe(
          isMaskooni => {
            this.filterValues.isMaskooni = isMaskooni;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
      this.isSaxtFilter.valueChanges
        .subscribe(
          isSaxt => {
            this.filterValues.isSaxt = isSaxt;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        )
    }

    const zoneDictionary = await this.getProvinceDictionary();

    this.provinceDictionary = zoneDictionary;

    this.convertIdToTitle(rolesData, zoneDictionary);

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
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.unsubscribe();
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.moshtarakinId.toString().toLowerCase().indexOf(searchTerms.moshtarakinId) !== -1
        && data.provinceId.toLowerCase().indexOf(searchTerms.provinceId) !== -1
        && data.hasReadingVibrate.toString().indexOf(searchTerms.hasReadingVibrate) !== -1
        && data.isMaskooni.toString().indexOf(searchTerms.isMaskooni) !== -1
        && data.isSaxt.toString().indexOf(searchTerms.isSaxt) !== -1
    }
    return filterFunction;
  }
}