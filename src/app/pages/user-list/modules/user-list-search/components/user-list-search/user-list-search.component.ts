import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    first,
    from,
    map,
    Observable,
    Subject,
    switchMap,
    takeUntil,
} from 'rxjs';

import { ValidationHelper } from '@common/validators/validation.helper';

@Component({
    selector: 'ntt-user-list-search',
    templateUrl: './user-list-search.component.html',
    styleUrls: ['./user-list-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListSearchComponent implements OnInit, OnDestroy {
    @Output() searchInput: EventEmitter<void> = new EventEmitter<void>();

    @Output() resetInput: EventEmitter<void> = new EventEmitter<void>();

    private readonly componentDestroyed$: Subject<void> = new Subject<void>();

    readonly searchByName: FormControl<string | null> = this.formBuilder.control('', [
        ValidationHelper.whitespaceValidator(),
    ]);

    constructor(
        private readonly router: Router,
        private readonly formBuilder: FormBuilder,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.subscribeOnSearch();
        this.checkQueryParams();
    }

    /**
     * complete subject on destroy hook for unsubscription
     */
    ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    /**
     * reset search control
     */
    resetSearch(): void {
        this.setNameQueryParam$(null).subscribe(() => {
            this.searchByName.setValue('');

            this.resetInput.emit();
        });
    }

    /**
     * subscribe on search by name input and emit value to parent component
     *
     * emits value only if value exists and longer than 3 chars
     * emits value once 300
     * can't emit 2 identical values in a row
     *
     * @private
     */
    private subscribeOnSearch(): void {
        this.searchByName.valueChanges
            .pipe(
                map((nameQuery: string | null) => nameQuery?.trim()),
                debounceTime(300),
                distinctUntilChanged(),
                filter(
                    (nameQuery: string | undefined): nameQuery is string =>
                        !!nameQuery && nameQuery.length >= 3 && this.searchByName.valid
                ),
                switchMap((nameQuery: string): Observable<boolean> => this.setNameQueryParam$(nameQuery)),
                takeUntil(this.componentDestroyed$)
            )
            .subscribe(() => {
                this.searchInput.emit();
            });
    }

    /**
     * check query params and set name query value to form control if exists
     *
     * @private
     */
    private checkQueryParams(): void {
        const { nameQuery } = this.activatedRoute.snapshot.queryParams;

        if (nameQuery) {
            this.searchByName.setValue(nameQuery as string);
        }
    }

    /**
     * set name query parameter in the url and return observable
     *
     * @param nameQuery - provided name query
     *
     * @private
     */
    private setNameQueryParam$(nameQuery: string | null): Observable<boolean> {
        return from(
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: {
                    nameQuery,
                },
                queryParamsHandling: 'merge',
            })
        ).pipe(first());
    }
}
