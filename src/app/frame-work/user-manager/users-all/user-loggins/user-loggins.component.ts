import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IUserLoggins } from 'interfaces/iuser-manager';
import { filter } from 'rxjs/internal/operators/filter';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { UserLogginsService } from 'services/user-loggins.service';
import { FactoryONE } from 'src/app/classes/factory';
import { EN_Routes } from 'src/app/Interfaces/routes.enum';

@Component({
  selector: 'app-user-loggins',
  templateUrl: './user-loggins.component.html',
  styleUrls: ['./user-loggins.component.scss']
})
export class UserLogginsComponent extends FactoryONE {
  UUID: string = '';


  dataSource: IUserLoggins[];
  _selectedColumns: any[];
  _selectCols: any[];

  constructor(

    private closeTabService: CloseTabService,
    private userLogginsService: UserLogginsService,
    private dateJalaliService: DateJalaliService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
    this.getRouteParams();
  }

  nullSavedSource = () => this.closeTabService.saveDataForUserLoggins = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.userLogginsService.getLogsDataSource(this.UUID);
    this.convertLoginTime();
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
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  backToPrevious = () => {
    this.router.navigate([EN_Routes.wrmuall]);
  }
  convertLoginTime = () => {
    this.dataSource.forEach(item => {
      item.loginDateTime = this.dateJalaliService.getDate(item.loginDateTime) + '   ' + this.dateJalaliService.getTime(item.loginDateTime);
    })
  }
  ngOnInit(): void { return; }
}