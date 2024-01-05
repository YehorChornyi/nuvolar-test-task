import { TestBed } from '@angular/core/testing';

import { HandleErrorInterceptor } from './handle-error.interceptor';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HandleErrorInterceptor', () => {
    let httpClient: HttpClient;
    let httpMock: HttpTestingController;
    let interceptor: HandleErrorInterceptor;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule, NoopAnimationsModule],
            providers: [
                HandleErrorInterceptor,
                {
                    provide: HTTP_INTERCEPTORS,
                    deps: [MatSnackBar],
                    useClass: HandleErrorInterceptor,
                    multi: true,
                },
            ],
        });

        interceptor = TestBed.inject(HandleErrorInterceptor);
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });

    it('should catch errors and show notification', async () => {
        const observable$ = httpClient.get('/api');
        const serviceUnavailable = new HttpErrorResponse({
            status: 503,
            statusText: 'Service Unavailable',
            url: '/api',
        });
        const snackBarSpy = jest.spyOn((interceptor as any).matSnackBar, 'open');

        const httpReqPromise = firstValueFrom(observable$);
        httpMock.expectOne('/api').flush('error', serviceUnavailable);

        try {
            await httpReqPromise;
            fail('It should have not succeeded');
        } catch (error: any) {
            expect(error instanceof HttpErrorResponse).toBeTruthy();
            expect(error.status).toBe(503);
            expect(snackBarSpy).toHaveBeenCalled();
        }
    });
});
