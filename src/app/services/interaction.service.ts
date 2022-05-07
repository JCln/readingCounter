import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { CloseTabService } from 'services/close-tab.service';

import { EN_Routes } from '../Interfaces/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  constructor(private closeTabService: CloseTabService, private router: Router) { }

  private latestReads = new Subject<any>();  

  private loading(latestReads: any) {
    this.latestReads.next(latestReads);
  }
  startLoading(object: any) {
    this.loading(object);
  }
  get getMomentLatestReads(): Observable<any> {
    return this.latestReads.asObservable();
  }
  
  setRefresh = async (url: string) => {
    this.closeTabService.cleanData(url);
    this.router.navigateByUrl(EN_Routes.wr, { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }
}
