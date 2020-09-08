import { Component, OnInit } from '@angular/core';
import { ISidebarItems } from 'src/app/Interfaces/isidebar-items';

import { SidebarItemsService } from './../../services/DI/sidebar-items.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  currentRoute: ISidebarItems[];

  constructor(private sideBarItemsService: SidebarItemsService) {
    this.currentRoute = this.sideBarItemsService.getSideBarItems();
  }

  ngOnInit(): void {
  }

  w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
  }

  w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
  }

}
