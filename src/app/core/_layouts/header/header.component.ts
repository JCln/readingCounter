import { AfterContentInit, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ENHubMessages } from 'interfaces/ioverall-config';
import { ENThemeColor } from 'interfaces/istyles';
import { SignalRService } from 'services/signal-r.service';
import { ThemeService } from 'services/theme.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterContentInit, OnChanges {
  ENHubMessages = ENHubMessages;
  private sideBar: boolean;
  @Input() sid_isSmall: boolean;
  @Output() sidebarEvent = new EventEmitter<boolean>();

  displayName: string = '';
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
  hubConnect = () => {
    this.signalRService.startConnection();
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
