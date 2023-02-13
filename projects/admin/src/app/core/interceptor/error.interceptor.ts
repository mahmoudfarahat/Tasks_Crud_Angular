import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private toaster:ToastrService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse) => {
        this.toaster.error(error.error.message)
        if(error.error.message =="jwt expired")
        {
          this.router.navigate(['/login'])
          localStorage.removeItem('token')
        }
        throw error
      })
    );
  }
}
