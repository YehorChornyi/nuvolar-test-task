import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserListComponent } from './user-list.component';
import { UserListModule } from '../../user-list.module';
import { clearUserListAction, searchUsersByNameAction } from '../../store/user-list.actions';
import { IUser } from '@common/interfaces/user-interface';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

describe('UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;

    const page = 1;
    const pageSize = 25;
    const nameQuery = 'Yehor';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserListComponent],
            imports: [
                UserListModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                HttpClientTestingModule,
                RouterTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            queryParams: { page, pageSize, nameQuery },
                        },
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
        it('should init the component and subscribe on user list data', () => {
            const spy = jest.spyOn(component as any, 'subscribeOnUserList');

            component.ngOnInit();

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('ngOnDestroy()', () => {
        it('should run before the component destroyed, complete subject and clear state', () => {
            const clearStateSpy = jest.spyOn((component as any).store, 'dispatch');
            const subjectNextSpy = jest.spyOn((component as any).componentDestroyed$, 'next');
            const subjectCompleteSpy = jest.spyOn((component as any).componentDestroyed$, 'complete');

            component.ngOnDestroy();

            expect(clearStateSpy).toHaveBeenCalledWith(clearUserListAction());
            expect(subjectNextSpy).toHaveBeenCalledTimes(1);
            expect(subjectCompleteSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('trackById()', () => {
        it('should return provided user id', () => {
            const id = 123123;

            const user: IUser = { id } as IUser;

            expect(component.trackById(1, user)).toEqual(id);
        });
    });

    describe('onSearchUsersByName()', () => {
        it('should search users by provided query using paginator config', () => {
            const dispatchStateSpy = jest.spyOn((component as any).store, 'dispatch');
            component.userList = [{}, {}, {}] as IUser[];
            component.currentQuery = '';

            component.onSearchUsersByName();

            expect(dispatchStateSpy).toHaveBeenCalledWith(
                searchUsersByNameAction({ nameQuery, paginatorConfig: { page: page + 1, pageSize } })
            );
            expect(component.userList.length).toEqual(0);
            expect(component.currentQuery).toEqual(nameQuery);
        });
    });

    describe('onResetList()', () => {
        it('should reset list and clear state', () => {
            const clearStateSpy = jest.spyOn((component as any).store, 'dispatch');
            component.userList = [{}, {}, {}] as IUser[];

            component.onResetList();

            expect(clearStateSpy).toHaveBeenCalledWith(clearUserListAction());
            expect(component.userList.length).toEqual(0);
        });
    });
});
