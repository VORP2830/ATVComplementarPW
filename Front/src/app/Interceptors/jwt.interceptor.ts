import { UserService } from './../Service/user.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, take, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser!: any;
    this.userService.currentUser$.pipe(take(1)).subscribe(user => {
      currentUser = user;

      if(currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
    });
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          if(error.status === 401){
            this.toastr.error("Usuário não autenticado!");
            localStorage.removeItem('user');
          }
        }
        return throwError(error)
      })
    )
  }
}
