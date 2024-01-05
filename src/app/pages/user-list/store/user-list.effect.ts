import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, first, map, of, switchMap } from 'rxjs';

import { BackendErrorsType } from '@common/interfaces/backend-errors.type';
import { IPaginatorConfig } from '@common/interfaces/paginator-config.interface';
import { ISearchUsers } from '../interfaces/search-users.interface';
import { UserListHttpService } from '../services/user-list-http.service';
import {
    searchUsersByNameAction,
    searchUsersByNameErrorAction,
    searchUsersByNameSuccessAction,
} from './user-list.actions';

@Injectable()
export class UserListEffect {
    /**
     * gets executed once searchUsersByNameAction is dispatched, makes api call and returns result back to store
     */
    searchUsersByName$ = createEffect(() =>
        this.actions.pipe(
            ofType(searchUsersByNameAction),
            switchMap(
                ({ nameQuery, paginatorConfig }: Action & { nameQuery: string; paginatorConfig: IPaginatorConfig }) => {
                    return this.userListHttpService.searchUsersByName$(nameQuery, paginatorConfig).pipe(
                        first(),
                        map((response: ISearchUsers) => {
                            return searchUsersByNameSuccessAction({ response });
                        }),
                        catchError((errorResponse: BackendErrorsType) => {
                            return of(searchUsersByNameErrorAction({ errors: errorResponse }));
                        })
                    );
                }
            )
        )
    );

    constructor(private readonly actions: Actions, private readonly userListHttpService: UserListHttpService) {}
}
