import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IUserLoggins } from 'interfaces/iuser-manager';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { UserLogginsService } from 'services/user-loggins.service';

@Component({
  selector: 'app-user-loggins',
  templateUrl: './user-loggins.component.html',
  styleUrls: ['./user-loggins.component.scss']
})
export class UserLogginsComponent implements AfterViewInit, OnDestroy {
  UUID: string = '';
  subscription: Subscription[] = [];

  dataSource: IUserLoggins[];
  _selectedColumns: any[];
  _selectCols: any[];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private userLogginsService: UserLogginsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.getRouteParams();
  }

  private insertSelectedColumns = () => {
    this._selectCols = this.userLogginsService.columnSelectedUserLogs();
    this._selectedColumns = this.userLogginsService.customizeSelectedColumns(this._selectCols);
  }
  nullSavedSource = () => this.closeTabService.saveDataForUserLoggins = null;
  private classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.userLogginsService.getLogsDataSource(this.UUID);
    this.convertLoginTime();

    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  private getRouteParams = () => {
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(res => {
        if (res) {
          this.UUID = this.route.snapshot.paramMap.get('UUID');
          this.classWrapper();
        }
      })
    )
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
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  backToPrevious = () => {
    this.router.navigate(['/wr/mu/all']);
  }
  convertLoginTime = () => {
    this.dataSource.forEach(item => {
      item.loginDateTime = new Date(item.loginDateTime).toLocaleDateString('fa-IR') + '   ' + new Date(item.loginDateTime).toLocaleTimeString('fa-IR');
    })
  }
}