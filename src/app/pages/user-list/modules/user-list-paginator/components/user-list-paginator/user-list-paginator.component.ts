import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { userListTotalCountSelector } from '../../../../store/user-list.state';

@Component({
    selector: 'ntt-user-list-paginator',
    templateUrl: './user-list-paginator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListPaginatorComponent implements OnInit {
    @Output() paginatorChange: EventEmitter<void> = new EventEmitter<void>();

    currentPage: number = 1;

    pageSize: number = 10;

    readonly listSizeOptions: number[] = [10, 25, 50, 100];

    readonly listTotalCount$: Observable<number | undefined> = this.store.select(userListTotalCountSelector);

    constructor(
        private readonly store: Store,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.checkQueryParams();
    }

    /**
     * emit event with paginator config on any change
     *
     * @param pageEvent
     */
    onPaginatorChange(pageEvent: PageEvent): void {
        this.currentPage = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;

        void this.router
            .navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: {
                    page: this.currentPage,
                    pageSize: this.pageSize,
                },
                queryParamsHandling: 'merge',
            })
            .then(() => {
                if (pageEvent.pageIndex !== pageEvent.previousPageIndex) {
                    this.paginatorChange.emit();
                }
            });
    }

    /**
     * check query params and set current page and page size values if found
     *
     * @private
     */
    private checkQueryParams(): void {
        const { page, pageSize } = this.activatedRoute.snapshot.queryParams;

        if (page) {
            this.currentPage = +page;
        }

        if (pageSize) {
            this.pageSize = +pageSize;
        }
    }
}
