import { Component, OnInit } from '@angular/core';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';

@Component({
  selector: 'app-sort-according-to',
  templateUrl: './sort-according-to.component.html',
  styleUrls: ['./sort-according-to.component.scss']
})
export class SortAccordingToComponent implements OnInit {

  constructor(
    public readingReportManagerService: ReadingReportManagerService  
  ) { }

  ngOnInit(): void {
  }

}
