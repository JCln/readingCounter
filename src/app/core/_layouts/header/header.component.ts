import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ENThemeColor } from 'interfaces/ioverall-config';
import { ThemeService } from 'services/theme.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClose', [
      state('closeSubItems', style({
        display: 'none'
      })),
      state('openSubItems', style({
        display: 'inline'
      })),
      transition('closeSubItems<=>openSubItems', animate('250ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent implements AfterContentInit, OnChanges {
  private sideBar: boolean;
  @Input() sid_isSmall: boolean;
  @Output() sidebarEvent = new EventEmitter<boolean>();

  displayName: string = '';
  _showColorPalete: boolean = false;

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
  changeColor = (id: ENThemeColor) => {
    this.themeService.setThemeColor(id);
  }

}
