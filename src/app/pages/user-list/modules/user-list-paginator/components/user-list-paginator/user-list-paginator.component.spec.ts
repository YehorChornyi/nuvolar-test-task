import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { UserListPaginatorComponent } from './user-list-paginator.component';
import { UserListPaginatorModule } from '../../user-list-paginator.module';
import { userListFeature } from '../../../../store/user-list.state';

describe('UserListPaginatorComponent', () => {
    let component: UserListPaginatorComponent;
    let fixture: ComponentFixture<UserListPaginatorComponent>;

    const page = 1;
    const pageSize = 25;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserListPaginatorComponent],
            imports: [
                UserListPaginatorModule,
                StoreModule.forRoot({}),
                StoreModule.forFeature(userListFeature),
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
                            queryParams: { page, pageSize },
                        },
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserListPaginatorComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
        it('should init the component and check url params', () => {
            const checkSpy = jest.spyOn(component as any, 'checkQueryParams');

            component.ngOnInit();

            expect(checkSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('checkQueryParams()', () => {
        it('check query params and set current page and page size values if found', () => {
            (component as any).checkQueryParams();

            expect(component.pageSize).toEqual(pageSize);
            expect(component.currentPage).toEqual(page);
        });
    });
});
