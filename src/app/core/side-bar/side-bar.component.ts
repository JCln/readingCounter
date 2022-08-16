import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SidebarItemsService } from 'services/DI/sidebar-items.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  animations: [
    trigger('openClose', [
      state('closeSubItems', style({
        minHeight: 'var(--font_33)',
        height: 'var(--font_33)',
      })),
      state('openSubItems', style({
        minHeight: '8rem',
        height: 'auto',
      })),
      transition('closeSubItems<=>openSubItems', animate('250ms ease-in-out'))
    ])
  ]
})
export class SideBarComponent implements OnInit {
  @Input() sid_isSmall: boolean;
  @Output() sidebarEvent = new EventEmitter<boolean>();
  smallScreen: boolean = false;
  currentRoute: any;

  constructor(
    private sideBarItemsService: SidebarItemsService,
    private testSidebarService: SidebarItemsService
  ) {
    this.getSidebar();
  }
  getSidebar = async () => {
    const sidebars = await this.sideBarItemsService.getSideBarItems();
    this.currentRoute = sidebars.items;
    // this.currentRoute = this.testSidebarService.getTestSideTest();
    // this.currentRoute = this.currentRoute.items;

  }
  ngOnInit(): void {
    if (screen.width <= 550) {
      this.smallScreen = true;
    }
  }
  toggleSubItems = (item: any): void => {
    let a = document.querySelectorAll('.pi-angle-up');
    this.currentRoute.forEach((aItem, i) => {
      if (item.title !== aItem.title) {
        aItem.isOpen = false;
        a[i].classList.remove('tsConfig');
      }
      else {
        aItem.isOpen = !aItem.isOpen;
        a[i].classList.toggle('tsConfig');
      }
    })
  }
  setSidebar = () => {
    this.sidebarEvent.emit(!this.sid_isSmall);
  }
}
