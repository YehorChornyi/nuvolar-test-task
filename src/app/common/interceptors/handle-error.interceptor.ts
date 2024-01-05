import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
    constructor(private readonly matSnackBar: MatSnackBar) {}

    /**
     * intercept function to handle errors in http requests and show a notification about with error message
     *
     * @param request
     * @param next
     */
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse): Observable<never> => {
                this.matSnackBar.open(error.message, 'X', { panelClass: ['mat-toolbar', 'mat-warn'] });

                return throwError(() => error);
            })
        );
    }
}
