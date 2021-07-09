import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackingManagerService } from 'services/tracking-manager.service';

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
    public route: ActivatedRoute,
    private trackingManagerService: TrackingManagerService
  ) { }

  ngOnInit(): void {
  }
  verification = () => {
    if (this.trackingManagerService.verificationFollowUPTrackNumber(this.trackNumber))
      this.routeToChild();
  }
  private routeToChild = () => {
    this.router.navigate(['wr/m/s/fwu/', this.trackNumber])
  }


}
