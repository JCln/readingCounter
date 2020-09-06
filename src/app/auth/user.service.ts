import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = (): boolean => {
    return false;
  }

  constructor() { }
}
