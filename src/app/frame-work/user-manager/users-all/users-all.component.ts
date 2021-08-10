import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IUserManager } from 'interfaces/iuser-manager';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { UsersAllService } from 'services/users-all.service';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html',
  styleUrls: ['./users-all.component.scss']
})
export class UsersAllComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(Table) UsersAllComponent: Table;
  subscription: Subscription[] = [];

  dataSource: IUserManager[] = [];
  _selectedColumns: any[];
  _selectCols: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private interactionService: InteractionService,
    private router: Router,
    private closeTabService: CloseTabService,
    public usersAllService: UsersAllService,
    private utilsService: UtilsService
  ) {
  }

  routeToEditPage(e) {
    this.router.navigate(['../edit', e], { relativeTo: this.route.parent })
  }
  routeToLoggs(e: string) {
    this.router.navigate(['./loggins', e], { relativeTo: this.route.parent })
  }
  nullSavedSource = () => this.closeTabService.saveDataForAllUsers = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.utilsService.isNull(this.closeTabService.saveDataForAllUsers)) {
      this.dataSource = await this.usersAllService.connectToServer(ENInterfaces.userGET);
      this.closeTabService.saveDataForAllUsers = this.dataSource;
    }
    else {
      this.dataSource = this.closeTabService.saveDataForAllUsers;
    }
    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.usersAllService.columnUserAllUsers();
    this._selectedColumns = this.usersAllService.customizeSelectedColumns(this._selectCols);
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/mu/all')
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
  ActivateUser = (dataSource: IUserManager) => {
    this.usersAllService.Activate(dataSource['dataSource'].id);
    this.refetchTable(dataSource['ri']);
  }
  DeActivateUser = (dataSource: object) => {
    this.usersAllService.DeActivate(dataSource['dataSource'].id);
    this.refetchTable(dataSource['ri']);
  }
  resetPasswordUser = (dataSource: object) => {
    this.usersAllService.resetPassword(dataSource['dataSource'].id);
    this.refetchTable(dataSource['ri']);
  }
  showExactConfig = (index: number) => {
    let a = document.querySelectorAll('.more_configs');
    a[index].classList.toggle('showConfigs');
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}
