import { AfterContentInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, Type } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ThemeService } from 'services/theme.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterContentInit, OnChanges, OnDestroy {
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
    this.subscription = this.authService.authStatus$.subscribe(res => {
      if (res) {
        const authUser = this.authService.getAuthUser();
        this.displayName = authUser ? authUser.displayName : '';
      }
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  logout = () => {
    this.authService.logout();
  }
  ngOnChanges(): void {
    this.sideBar = this.sid_isSmall;
  }
  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }
}
