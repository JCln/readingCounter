import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { IForbiddenManager, IForbiddenManagerGridFriendlyRes } from 'src/app/Interfaces/imanage';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { ForbiddenService } from 'src/app/services/forbidden.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {
  subscription: Subscription[] = [];

  dataSource: IForbiddenManager[] = [];
  dataSourceRES: IForbiddenManagerGridFriendlyRes;

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private forbiddenService: ForbiddenService
  ) {
  }

  nullSavedSource = () => this.closeTabService.saveDataForForbidden = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForForbidden) {
      this.dataSourceRES = this.closeTabService.saveDataForForbidden;
    }
    else {
      this.dataSourceRES = await this.forbiddenService.getGridFriendlyDataSourceDefault();
      this.closeTabService.saveDataForForbidden = this.dataSourceRES;
    }
    this.dataSource = this.dataSourceRES.data;
    console.log(this.dataSource);
  }
  sendGridFriendlyDataSource = async (event: LazyLoadEvent) => {
    const req = this.forbiddenService.setGridFriendlyDataSource(event);
    console.log(req);

    // this.dataSource = await this.forbiddenService.getDataSource(req);
  }
  insertSelectedColumns = () => {
    this._selectCols = this.forbiddenService.columnSelectedMenuDefault();
    this._selectedColumns = this.forbiddenService.customizeSelectedColumns();
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