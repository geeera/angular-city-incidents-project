import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SnackbarService } from '../services/snackbar/snackbar.service';

/*
* This interceptor not work correctly, such as
* firebase don't allow request authorization with bearer token.
* */

export const provideAuthInterceptor = () => {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private snackbar = inject(SnackbarService);
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = environment.firebaseConfig.apiKey;
    const cloned = req.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });

    return next.handle(cloned).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.snackbar.openErrorSnack(err.message || 'Authentication failed');
        }
        return throwError(err);
      })
    );
  }
}
