import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserListSearchComponent } from './user-list-search.component';
import { UserListSearchModule } from '../../user-list-search.module';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('UserListSearchComponent', () => {
    let component: UserListSearchComponent;
    let fixture: ComponentFixture<UserListSearchComponent>;

    const nameQuery = 'Yehor';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserListSearchComponent],
            imports: [
                UserListSearchModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([]),
                NoopAnimationsModule,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            queryParams: { nameQuery },
                        },
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserListSearchComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
        it('should init the component and subscribe on search input and check url params', () => {
            const checkSpy = jest.spyOn(component as any, 'subscribeOnSearch');
            const subscribeSpy = jest.spyOn(component as any, 'checkQueryParams');

            component.ngOnInit();

            expect(checkSpy).toHaveBeenCalledTimes(1);
            expect(subscribeSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('ngOnDestroy()', () => {
        it('should run before the component destroyed and complete subject', () => {
            const subjectNextSpy = jest.spyOn((component as any).componentDestroyed$, 'next');
            const subjectCompleteSpy = jest.spyOn((component as any).componentDestroyed$, 'complete');

            component.ngOnDestroy();

            expect(subjectNextSpy).toHaveBeenCalledTimes(1);
            expect(subjectCompleteSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('subscribeOnSearch()', () => {
        it('should subscribe on search input value change and apply value to mat-filter once emitted', fakeAsync(() => {
            (component as any).setNameQueryParam$ = (nameQuery: string | null): Observable<boolean> => {
                return of(false);
            };
            const inputValue = 'MoCk';
            const debounceTime = 300;
            const valueChangesSubscribeSpy = jest.spyOn(component.searchByName.valueChanges, 'subscribe');
            const eventEmitterSpy = jest.spyOn(component.searchInput, 'emit');
            const setQueryParamsSpy = jest.spyOn(component as any, 'setNameQueryParam$');

            (component as any).subscribeOnSearch();

            component.searchByName.setValue(inputValue);
            component.searchByName.updateValueAndValidity({ emitEvent: true });

            tick(debounceTime);

            expect(debounceTime).toEqual(300);
            expect(valueChangesSubscribeSpy).toHaveBeenCalled();
            expect(eventEmitterSpy).toHaveBeenCalled();
            expect(setQueryParamsSpy).toHaveBeenCalledWith(inputValue);
        }));
    });

    describe('checkQueryParams()', () => {
        it('should check query params and set name query value to form control if exists', () => {
            (component as any).checkQueryParams();

            expect(component.searchByName.value).toEqual(nameQuery);
        });
    });
});
