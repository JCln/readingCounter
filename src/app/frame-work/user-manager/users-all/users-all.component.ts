import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IUserManager } from 'interfaces/iuser-manager';
import { EN_Routes } from 'interfaces/routes.enum';
import { Table } from 'primeng/table';
import { CloseTabService } from 'services/close-tab.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html',
  styleUrls: ['./users-all.component.scss']
})
export class UsersAllComponent extends FactoryONE {
  @ViewChild(Table) UsersAllComponent: Table;


  dataSource: IUserManager[] = [];
  _selectedColumns: any[];
  _selectCols: any[] = [];

  constructor(
    private route: ActivatedRoute,

    private router: Router,
    private closeTabService: CloseTabService,
    public usersAllService: UsersAllService
  ) {
    super();
  }

  routeToEditPage(e) {
    this.router.navigate([EN_Routes.edit, e], { relativeTo: this.route.parent })
  }
  routeToLoggs(e: string) {
    this.router.navigate([EN_Routes.loggins, e], { relativeTo: this.route.parent })
  }
  nullSavedSource = () => this.closeTabService.saveDataForAllUsers = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (MathS.isNull(this.closeTabService.saveDataForAllUsers)) {
      this.dataSource = await this.usersAllService.connectToServer(ENInterfaces.userGET);
      this.closeTabService.saveDataForAllUsers = this.dataSource;
    }
    else {
      this.dataSource = this.closeTabService.saveDataForAllUsers;
    }
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
  unLockUser = (dataSource: object) => {
    this.usersAllService.unlockUser(dataSource['dataSource'].id);
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
