import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { useSpinner } from '@common/shared-components/spinner/components/spinner/spinner.component';

@Injectable()
export class LoadingStateInterceptor implements HttpInterceptor {
    /**
     * intercept function that calls useSpinner function on each API call
     *
     * @param request
     * @param next
     */
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(useSpinner());
    }
}
