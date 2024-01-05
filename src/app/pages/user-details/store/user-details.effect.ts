import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, first, map, of, switchMap } from 'rxjs';

import { BackendErrorsType } from '@common/interfaces/backend-errors.type';
import { IUserDetails } from '../intefaces/user-details.interface';
import { UserDetailsHttpService } from '../services/user-details-http.service';
import { getUserByIdAction, getUserByIdErrorAction, getUserByIdSuccessAction } from './user-details.actions';

@Injectable()
export class UserDetailsEffect {
    /**
     * gets executed once getUserByIdAction is dispatched, makes api call and returns result back to store
     */
    searchUsersByName$ = createEffect(() =>
        this.actions.pipe(
            ofType(getUserByIdAction),
            switchMap(({ userId }: Action & { userId: string }) => {
                return this.userDetailsHttpService.getUserById$(userId).pipe(
                    first(),
                    map((response: IUserDetails) => {
                        return getUserByIdSuccessAction({ response });
                    }),
                    catchError((errorResponse: BackendErrorsType) => {
                        return of(getUserByIdErrorAction({ errors: errorResponse }));
                    })
                );
            })
        )
    );

    constructor(private readonly actions: Actions, private readonly userDetailsHttpService: UserDetailsHttpService) {}
}
