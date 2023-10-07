import { AfterContentInit, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENHubMessages } from 'interfaces/ioverall-config';
import { ENThemeColor } from 'interfaces/istyles';
import { EN_Routes } from 'interfaces/routes.enum';
import { SignalRService } from 'services/signal-r.service';
import { ThemeService } from 'services/theme.service';
import { AuthService } from 'src/app/auth/auth.service';

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

  constructor(
    private authService: AuthService,
    public themeService: ThemeService,
    public signalRService: SignalRService
  ) { }

  setSidebar = () => {
    this.sideBar = !this.sideBar;
    this.sidebarEvent.emit(this.sideBar);
  }
  getNotificationBadge = async (): Promise<number> => {
    const res = await this.signalRService.ajaxReqWrapperService.getDataSource(ENInterfaces.NotifyManagerUnreadCount);
    return res.count;
  }
  getNotification = async () => {
    this.badgeNumber = await this.getNotificationBadge();
  }
  hubConnect = () => {
    this.signalRService.startConnection();
    this.getNotification();
  }
  ngAfterContentInit(): void {
    const authUser = this.authService.getAuthUser();
    this.displayName = authUser ? authUser.displayName : '';
    this.hubConnect();
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
