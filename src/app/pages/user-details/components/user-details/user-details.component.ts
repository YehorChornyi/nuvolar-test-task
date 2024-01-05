import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IUserDetails } from '../../intefaces/user-details.interface';
import { clearUserDetailsAction, getUserByIdAction } from '../../store/user-details.actions';
import { userDetailsFeature } from '../../store/user-details.state';

@Component({
    selector: 'ntt-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    readonly user$: Observable<IUserDetails | null> = this.store.select(userDetailsFeature.selectData);

    readonly isLoadingUser$: Observable<boolean> = this.store.select(userDetailsFeature.selectIsLoading);

    constructor(private readonly store: Store, private readonly activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.fetchUser();
    }

    /**
     * clear user details state once component destroyed
     */
    ngOnDestroy(): void {
        this.store.dispatch(clearUserDetailsAction());
    }

    /**
     * fetch user using userId from current url
     */
    fetchUser(): void {
        const { userId } = this.activatedRoute.snapshot.params;

        this.store.dispatch(getUserByIdAction({ userId }));
    }
}
