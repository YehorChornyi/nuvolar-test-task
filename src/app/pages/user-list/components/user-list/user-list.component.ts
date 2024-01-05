import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, Subject, takeUntil, tap } from 'rxjs';

import { IUser } from '@common/interfaces/user-interface';
import { TrackByUtil } from '@common/utils/track-by.util';
import { ISearchUsers } from '../../interfaces/search-users.interface';
import { clearUserListAction, searchUsersByNameAction } from '../../store/user-list.actions';
import { userListFeature, userListTotalCountSelector } from '../../store/user-list.state';

@Component({
    selector: 'ntt-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit, OnDestroy {
    private readonly componentDestroyed$: Subject<void> = new Subject<void>();

    userList: IUser[] = [];

    currentQuery: string = '';

    readonly listTotalCount$: Observable<number | undefined> = this.store.select(userListTotalCountSelector);

    readonly isLoadingList$: Observable<boolean> = this.store.select(userListFeature.selectIsLoading);

    constructor(
        private readonly store: Store,
        private readonly activatedRoute: ActivatedRoute,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.subscribeOnUserList();
    }

    /**
     * complete subject on destroy hook for unsubscription and clear user list state once component destroyed
     */
    ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();

        this.store.dispatch(clearUserListAction());
    }

    /**
     * trackBy function to compare the current object with the new one by *ngFor element custom field
     *
     * @param index - *ngFor element index
     * @param item - *ngFor element
     *
     */
    trackById = (index: number, item: IUser): number => TrackByUtil.trackByCustomField(index, item, 'id') as number;

    /**
     * search users by provided query using paginator config
     * all parameters are taken from the URL
     */
    onSearchUsersByName(): void {
        const { page, pageSize, nameQuery } = this.activatedRoute.snapshot.queryParams;

        this.userList = [];

        if (nameQuery) {
            this.currentQuery = nameQuery;

            this.store.dispatch(
                searchUsersByNameAction({
                    nameQuery,
                    paginatorConfig: { page: (page ? +page : 0) + 1, pageSize: pageSize ?? 10 },
                })
            );
        }
    }

    /**
     * reset list and clear state
     */
    onResetList(): void {
        this.userList = [];

        this.store.dispatch(clearUserListAction());
    }

    /**
     * subscribe on user list state
     */
    private subscribeOnUserList(): void {
        this.store
            .select(userListFeature.selectData)
            .pipe(
                map((searchUsersResponse: ISearchUsers | null) => searchUsersResponse?.items),
                filter((userList: IUser[] | undefined): userList is IUser[] => Array.isArray(userList)),
                tap((userList: IUser[]): void => {
                    this.userList = userList;

                    this.changeDetectorRef.detectChanges();
                }),
                takeUntil(this.componentDestroyed$)
            )
            .subscribe();
    }
}
