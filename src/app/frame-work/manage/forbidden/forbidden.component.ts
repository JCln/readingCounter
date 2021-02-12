import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ICounterStateGridFriendlyResp } from 'src/app/Interfaces/imanage';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {
  subscription: Subscription[] = [];

  dataSource: ICounterStateGridFriendlyResp[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];
  selectedFuckingTest: any[] = [];

  _firstPage: number = 0;
  _rowsNumberPage: number = 10;

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) {
  }

  getDataSource = (): Promise<ICounterStateGridFriendlyResp[]> => {
    try {
      return new Promise((resolve) => {
        // ....
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  nullSavedSource = () => this.closeTabService.saveDataForForbidden = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForForbidden) {
      this.dataSource = this.closeTabService.saveDataForForbidden;
    }
    else {
      this.dataSource = await this.getDataSource();
      console.log(this.dataSource);

      this.closeTabService.saveDataForForbidden = this.dataSource;
    }
  }
  insertSelectedColumns = () => {
    // this._selectCols = this.trackingManagerService.columnSelectedMenuDefault();
    // this._selectedColumns = this.customizeSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
    this.insertSelectedColumns();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/fbn')
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