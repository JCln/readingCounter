import { Component, EventEmitter, Output, Type } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private sideBar: boolean;
  @Output() sidebarEvent = new EventEmitter<boolean>();
  DateJalaliComponent?: Type<any>

  isDateJalaliLoaded: boolean = false;

  setSidebar = () => {
    this.sideBar = !this.sideBar;
    this.sidebarEvent.emit(this.sideBar);
  }

  loadDateJalali = () => {
    import('./date-jalali/date-jalali.module').then(jd => jd.DateJalaliModule).then(DateJalaliModule => {
      this.DateJalaliComponent = DateJalaliModule.components['lazy'];
    })
    this.isDateJalaliLoaded = true;
  }
}
