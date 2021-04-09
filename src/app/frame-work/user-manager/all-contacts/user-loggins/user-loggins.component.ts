import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';

import { IUserLoggins } from './../../../../Interfaces/iuser-manager';
import { UserLogginsService } from './../../../../services/user-loggins.service';

@Component({
  selector: 'app-user-loggins',
  templateUrl: './user-loggins.component.html',
  styleUrls: ['./user-loggins.component.scss']
})
export class UserLogginsComponent implements OnInit, AfterViewInit, OnDestroy {
  UUID: string = '';
  subscription: Subscription[] = [];

  dataSource: IUserLoggins[];
  _selectedColumns: any[];
  _selectMainDatas: any[];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private userLogginsService: UserLogginsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.getRouteParams();
  }

  getDataSource = async () => {
    this.dataSource = await this.userLogginsService.getLogsDataSource(this.UUID);
    this.insertSelectedColumns();
  }
  private insertSelectedColumns = () => {
    this._selectMainDatas = this.userLogginsService.columnSelectedUserLogs();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  nullSavedSource = () => this.closeTabService.saveDataForUserLoggins = null;
  private classWrapper = (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.getDataSource();
  }
  customizeSelectedColumns = () => {
    return this._selectMainDatas.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  private getRouteParams = () => {
    this.subscription.push(this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (res) {
          this.UUID = this.route.snapshot.paramMap.get('UUID');
          this.classWrapper();
        }
      }
    })
    )
  }
  ngOnInit(): void {

  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res.includes('/wr/mu/all/loggins/'))
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
  refreshTable = () => {
    this.classWrapper(true);
  }
}