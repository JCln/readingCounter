import { AfterContentInit, Component, EventEmitter, OnDestroy, Output, Type } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterContentInit, OnDestroy {
  private sideBar: boolean;
  @Output() sidebarEvent = new EventEmitter<boolean>();
  DateJalaliComponent?: Type<any>;
  subscription: Subscription;

  displayName: string = '';

  constructor(private authService: AuthService) { }

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
}
