import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedIn: boolean = false;

  loginStatus = (): boolean => {
    return true;
    // console.log(this.isLoggedIn);

    // if (this.isLoggedIn)
    //   return true;
    // return false;
  }

  logginIn(isLoggedIn: boolean) {
    console.log(isLoggedIn);
    this.isLoggedIn = isLoggedIn;
  }


  constructor() { }
}
