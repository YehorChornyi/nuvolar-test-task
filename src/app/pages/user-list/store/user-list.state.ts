import { Action, createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { ISearchUsers } from '../interfaces/search-users.interface';
import { ISearchUsersState } from '../interfaces/search-users-state.interface';
import {
    clearUserListAction,
    searchUsersByNameAction,
    searchUsersByNameErrorAction,
    searchUsersByNameSuccessAction,
} from './user-list.actions';

const userListFeatureKey = 'userList';

const initialUserListState: ISearchUsersState = {
    isLoading: false,
    errors: null,
    data: null,
};

/**
 * user list state reducer
 */
const userListReducer = createReducer(
    initialUserListState,
    on(searchUsersByNameAction, (state: ISearchUsersState) => ({
        ...state,
        errors: null,
        isLoading: true,
    })),
    on(searchUsersByNameSuccessAction, (state: ISearchUsersState, action: Action & { response: ISearchUsers }) => ({
        ...state,
        data: action.response,
        isLoading: false,
        errors: null,
    })),
    on(searchUsersByNameErrorAction, (state: ISearchUsersState) => ({
        ...state,
        isLoading: false,
        data: null,
    })),
    on(clearUserListAction, () => initialUserListState)
);

/**
 * user list state feature
 */
export const userListFeature = createFeature({
    name: userListFeatureKey,
    reducer: userListReducer,
});

/**
 * total user list items count custom selector
 */
export const userListTotalCountSelector = createSelector(
    userListFeature.selectData,
    (state: ISearchUsers | null): number | undefined => state?.total_count
);
