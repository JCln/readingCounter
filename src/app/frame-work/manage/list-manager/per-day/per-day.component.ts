import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IListManagerPD } from 'src/app/Interfaces/imanage';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ListManagerService } from 'src/app/services/list-manager.service';

import { UtilsService } from './../../../../services/utils.service';


@Component({
  selector: 'app-per-day',
  templateUrl: './per-day.component.html',
  styleUrls: ['./per-day.component.scss']
})
export class PerDayComponent implements OnInit, AfterViewInit, OnDestroy {
  trackNumber: string;
  subscription: Subscription[] = [];

  dataSource: IListManagerPD;
  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private listManagerService: ListManagerService,
    private utilsService: UtilsService,
    private route: ActivatedRoute
  ) {
  }

  routeToLMPDXY = (row: IListManagerPD) => {
    console.log(row);
    console.log(row.trackNumber + '    ' + row.offLoadPerDayHistory[0].day);

    // this.utilsService.routeToByParams('../../l/pdxy', { trackNumber: row.trackNumber, day: row.offLoadPerDayHistory[0].day });
  }
  getDataSource = (): Promise<IListManagerPD> => {
    return new Promise((resolve) => {
      this.listManagerService.getLMPD(this.trackNumber).subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  nullSavedSource = () => this.closeTabService.saveDataForLMPD = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForLMPD) {
      this.dataSource = this.closeTabService.saveDataForLMPD;
    }
    else {
      this.dataSource = await this.getDataSource();
      this.closeTabService.saveDataForLMPD = this.dataSource;
    }
    console.log(this.dataSource);
  }
  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  insertSelectedColumns = () => {
    this._selectCols = this.listManagerService.columnSelectedLMPerDay();
    console.log(this.customizeSelectedColumns());


    this._selectedColumns = this.customizeSelectedColumns();
  }
  getRouteParams = () => {
    this.trackNumber = this.route.snapshot.paramMap.get('trackNumber');
  }
  ngOnInit(): void {
    this.getRouteParams();
    this.classWrapper();
    this.insertSelectedColumns();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/l/pd')
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

}