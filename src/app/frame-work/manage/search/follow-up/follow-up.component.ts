import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { TrackingManagerService } from 'services/tracking-manager.service';

import { FollowUpService } from './follow-up.service';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent implements OnInit {
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private trackingManagerService: TrackingManagerService,
    public followUpService: FollowUpService
  ) { }

  ngOnInit(): void {
  }
  verification = async () => {
    if (this.trackingManagerService.verificationFollowUPTrackNumber(this.followUpService.trackNumber)) {
      const dataSource = this.followUpService.setData(await this.trackingManagerService.getDataSourceByQuote(ENInterfaces.trackingFOLLOWUP, this.followUpService.trackNumber));
      if (this.trackingManagerService.isValidationNull(dataSource)) {
        this.routeToChild();
      }
    }
  }
  private routeToChild = () => {
    this.router.navigate(['wr/m/s/fwu/', this.followUpService.trackNumber])
  }


}
