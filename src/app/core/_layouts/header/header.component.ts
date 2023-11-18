import { AfterContentInit, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENHubMessages, EN_messages } from 'interfaces/enums.enum';
import { ENThemeColor } from 'interfaces/istyles';
import { EN_Routes } from 'interfaces/routes.enum';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SignalRService } from 'services/signal-r.service';
import { ThemeService } from 'services/theme.service';
import { UtilsService } from 'services/utils.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MyPreviousFailuresComponent } from './my-previous-failures/my-previous-failures.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterContentInit, OnChanges {
  routeToMyMessages = EN_Routes.NotificationMessages;
  ENHubMessages = ENHubMessages;
  sideBar: boolean;
  @Input() sid_isSmall: boolean;
  @Output() sidebarEvent = new EventEmitter<boolean>();

  displayName: string = '';
  badgeNumber: number = 0;
  _showColorPalete: boolean = false;
  ref: DynamicDialogRef;

  constructor(
    private authService: AuthService,
    public themeService: ThemeService,
    public signalRService: SignalRService,
    private utilsService: UtilsService,
    public dialogService: DialogService,
  ) { }

  setSidebar = () => {
    this.sideBar = !this.sideBar;
    this.sidebarEvent.emit(this.sideBar);
  }
  changePasswordFromDialog = async (): Promise<any> => {
    const config = {
      messageTitle: EN_messages.passwordShouldChange,
      text: EN_messages.passwordShouldChangeReason,
      isInput: false,
      doesNotReturnButton: true,
      disableClose: true,
      isDelete: false,
      changePassword: true,
      icon: 'pi pi-unlock',
      minWidth: '20rem',
    }
    const buttonSavedClicked = await this.utilsService.firstConfirmDialog(config);
    if (buttonSavedClicked) {
      return new Promise(async (resolve) => {
        resolve(true);
      });
    }
  }
  private openMyPreviousDialog = (dataSource: any) => {
    this.ref = this.dialogService.open(MyPreviousFailuresComponent, {
      data: dataSource,
      rtl: true,
      width: '90%'
    })
    this.ref.onClose.subscribe((res: any) => {
      if (res)
        console.log(res);
    });
  }
  getNotification = async () => {
    const myPrevious = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.myPreviousFailures);
    if (myPrevious.length)
      this.openMyPreviousDialog(myPrevious);
    const shouldIChangePass = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.getShouldIChangePassword);
    if (shouldIChangePass)
      this.changePasswordFromDialog();
    const counter = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.NotifyManagerUnreadCount);
    this.badgeNumber = counter.count;
  }

  hubConnect = () => {
    this.signalRService.startConnection();
  }
  ngAfterContentInit(): void {
    const authUser = this.authService.getAuthUser();
    this.displayName = authUser ? authUser.displayName : '';
    this.hubConnect();
    this.getNotification();
  }
  logout = () => {
    this.authService.logout();
  }
  ngOnChanges(): void {
    this.sideBar = this.sid_isSmall;
  }
  changeColor = (id: ENThemeColor) => {
    this.themeService.setThemeColor(id);
  }

}
