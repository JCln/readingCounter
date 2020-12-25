import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { InteractionService } from 'src/app/services/interaction.service';

import { IAPK } from './../../Interfaces/iapk';

const ELEMENT_DATA: IAPK[] = [
  { name: 'اول', version: 'v.0.0.1', file: 'f' },
  { name: 'دوم', version: 'V.0.0.2', file: 's' },
  { name: 'سوم', version: 'v.0.0.3', file: 'long name' },
  { name: 'چهارم', version: 'v.0.0.4', file: 'another long name' }
];
@Component({
  selector: 'app-apk',
  templateUrl: './apk.component.html',
  styleUrls: ['./apk.component.scss']
})
export class ApkComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  displayedColumns: string[] = ['name', 'version', 'file'];
  dataSource = ELEMENT_DATA;

  constructor(
    private interactionService: InteractionService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/apk')
          this.ngOnInit();
      }
    })
    )
  }
  ngAfterViewInit(): void {  
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
