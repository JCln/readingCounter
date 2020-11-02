import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.loginService.getAuthorizationToken();

    if (authToken) {
      req = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });
      req = req.clone({
        headers: req.headers.set('X-XSRF-TOKEN', '123')
      })
    }

    return next.handle(req);
  }

}