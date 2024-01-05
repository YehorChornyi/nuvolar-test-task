import { UserDetailsComponent } from './user-details.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsModule } from '../../user-details.module';
import { clearUserDetailsAction, getUserByIdAction } from '../../store/user-details.actions';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('UserDetailsComponent', () => {
    let component: UserDetailsComponent;
    let fixture: ComponentFixture<UserDetailsComponent>;

    const userId = '000-000';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserDetailsComponent],
            imports: [
                UserDetailsModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            params: { userId },
                        },
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDetailsComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
        it('should init the component and fetch user data', () => {
            const spy = jest.spyOn(component, 'fetchUser');

            component.ngOnInit();

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('ngOnDestroy()', () => {
        it('should run before the component destroyed and clear store', () => {
            const spy = jest.spyOn((component as any).store, 'dispatch');

            component.ngOnDestroy();

            expect(spy).toHaveBeenCalledWith(clearUserDetailsAction());
        });
    });

    describe('fetchUser()', () => {
        it('should fetch user using user id from url', () => {
            const fetchUserSpy = jest.spyOn(component, 'fetchUser');
            const dispatchSpy = jest.spyOn((component as any).store, 'dispatch');

            component.fetchUser();

            expect(fetchUserSpy).toHaveBeenCalled();
            expect(dispatchSpy).toHaveBeenCalledWith(getUserByIdAction({ userId }));
        });
    });
});
