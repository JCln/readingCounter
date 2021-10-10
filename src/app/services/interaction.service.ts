import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private refreshSource = new BehaviorSubject<string>('');

  constructor(private router: Router) { }

  getRefreshedPage = (): Observable<string> => {
    return this.refreshSource.asObservable();
  }
  setRefresh = async (url: string) => {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }
}
