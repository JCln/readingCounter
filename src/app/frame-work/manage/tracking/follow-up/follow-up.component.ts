import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent implements OnInit {
  trackNumber: number;

  dataSource = new MatTableDataSource();
  desc: any;

  columnsToDisplay = [
    'insertDateJalali',
    'userDisplayName',
    'seen',
    'counterReaderName',
    'trackStatusTitle',
    'hasDetails',
    'actions'
  ];

  constructor(
    private router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
  routeToChild = () => {
    this.router.navigate(['wr/m/track/fwu/', this.trackNumber])
  }


}
