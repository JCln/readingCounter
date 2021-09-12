import { AfterContentInit, Component, EventEmitter, Input, OnChanges, Output, Type } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ThemeService } from 'services/theme.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterContentInit, OnChanges {
  private sideBar: boolean;
  @Input() sid_isSmall: boolean;
  @Output() sidebarEvent = new EventEmitter<boolean>();
  DateJalaliComponent?: Type<any>;
  subscription: Subscription;

  displayName: string = '';

  constructor(
    private authService: AuthService,
    public themeService: ThemeService
  ) { }

  setSidebar = () => {
    this.sideBar = !this.sideBar;
    this.sidebarEvent.emit(this.sideBar);
  }
  ngAfterContentInit(): void {
    const authUser = this.authService.getAuthUser();
    this.displayName = authUser ? authUser.displayName : '';
  }
  logout = () => {
    this.authService.logout();
  }
  ngOnChanges(): void {
    this.sideBar = this.sid_isSmall;
  }
  toggleTheme() {
    this.themeService.toggleTheme();
  }

}
