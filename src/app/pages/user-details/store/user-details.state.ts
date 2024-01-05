import { Action, createFeature, createReducer, on } from '@ngrx/store';

import { IUserDetails } from '../intefaces/user-details.interface';
import { IUserDetailsState } from '../intefaces/user-details-state.interface';
import {
    clearUserDetailsAction,
    getUserByIdAction,
    getUserByIdErrorAction,
    getUserByIdSuccessAction,
} from './user-details.actions';

const userDetailsFeatureKey = 'userDetails';

const initialUserDetailsState: IUserDetailsState = {
    isLoading: false,
    errors: null,
    data: null,
};

/**
 * user details state reducer
 */
const userDetailsReducer = createReducer(
    initialUserDetailsState,
    on(getUserByIdAction, (state: IUserDetailsState) => ({
        ...state,
        isLoading: true,
        errors: null,
    })),
    on(getUserByIdSuccessAction, (state: IUserDetailsState, action: Action & { response: IUserDetails }) => ({
        ...state,
        data: action.response,
        isLoading: false,
        errors: null,
    })),
    on(getUserByIdErrorAction, (state: IUserDetailsState) => ({
        ...state,
        isLoading: false,
        data: null,
    })),
    on(clearUserDetailsAction, () => initialUserDetailsState)
);

/**
 * user details state feature
 */
export const userDetailsFeature = createFeature({
    name: userDetailsFeatureKey,
    reducer: userDetailsReducer,
});
