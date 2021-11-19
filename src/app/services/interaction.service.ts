import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CloseTabService } from 'services/close-tab.service';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  constructor(private closeTabService: CloseTabService, private router: Router) { }

  setRefresh = async (url: string) => {
    this.closeTabService.cleanData(url);
    this.router.navigateByUrl('/wr', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }
}
