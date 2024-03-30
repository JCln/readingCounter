import { Component, OnInit } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';

@Component({
  selector: 'app-sort-according-to',
  templateUrl: './sort-according-to.component.html',
  styleUrls: ['./sort-according-to.component.scss']
})
export class SortAccordingToComponent implements OnInit {

  constructor(
    public closeTabService: CloseTabService
  ) { }

  ngOnInit(): void {
  }

}
