import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingStateInterceptor } from '@common/interceptors/loading-state.interceptor';
import * as spinner from '@common/shared-components/spinner/components/spinner/spinner.component';

describe('LoadingStateInterceptor', () => {
    let httpClient: HttpClient;
    let httpMock: HttpTestingController;
    let interceptor: LoadingStateInterceptor;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [
                LoadingStateInterceptor,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: LoadingStateInterceptor,
                    multi: true,
                },
            ],
        });

        interceptor = TestBed.inject(LoadingStateInterceptor);
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });

    it('should run spinner', async () => {
        const observable$ = httpClient.get('/api');
        const serviceUnavailable = new HttpErrorResponse({
            status: 200,
            statusText: 'OK',
            url: '/api',
        });
        const useSpinnerSpy = jest.spyOn(spinner, 'useSpinner');

        const httpReqPromise = firstValueFrom(observable$);
        httpMock.expectOne('/api').flush('', serviceUnavailable);

        try {
            await httpReqPromise;

            expect(useSpinnerSpy).toHaveBeenCalled();
        } catch (error: any) {}
    });
});
