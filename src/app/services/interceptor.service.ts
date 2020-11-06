import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private jwtService: JwtService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.jwtService.getAuthorizationToken();
    if (authToken) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ` + authToken),
        withCredentials: true
      });
    }
    else {
      this.router.navigateByUrl('login');
    }

    return next.handle(req)
    // .pipe(
    //     tap((event: HttpEvent<any>) => {
    //       if (event instanceof HttpResponse) {
    //         console.log(event.headers.keys);
    //       }
    //     })
    //   )
  }


}