import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';

import { UtilsService } from './../../../../services/utils.service';

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
    private trackingManagerService: TrackingManagerService,
    private utilsService: UtilsService,
    public route: ActivatedRoute,
    private router: Router,
    private vcref: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }
  followUpReq = async () => {
    this.vcref.clear();
    this.trackingManagerService.getFollowUpSource(this.trackNumber).subscribe(res => {
      if (res) {
        this.dataSource.data = res.changeHistory;
        this.desc = res;
        console.log(this.dataSource);
        console.log(this.desc);

        // this.router.navigate(['./desc']);
      }
    })
    //   setTimeout(async () => {
    //     const { DescComponent } = await import('./desc/desc.component');
    //     let descCompo = this.vcref.createComponent(
    //       this.cfr.resolveComponentFactory(DescComponent)
    //     );
    //     console.log(this.dataSource.data);

    //     descCompo.instance.dataSource.data = this.dataSource.data;
    //     descCompo.instance.desc = this.desc;
    //     this.router.navigate(['desc']);
    //   }, 3000);
  }

}
