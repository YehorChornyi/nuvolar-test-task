import { createAction, props } from '@ngrx/store';

import { BackendErrorsType } from '@common/interfaces/backend-errors.type';
import { IPaginatorConfig } from '@common/interfaces/paginator-config.interface';
import { EActionTypes } from '../enums/action-types.enum';
import { ISearchUsers } from '../interfaces/search-users.interface';

/**
 * get user list actions
 */
export const searchUsersByNameAction = createAction(
    EActionTypes.SEARCH_USERS_BY_NAME,
    props<{ nameQuery: string; paginatorConfig: IPaginatorConfig }>()
);

export const searchUsersByNameSuccessAction = createAction(
    EActionTypes.SEARCH_USERS_BY_NAME_SUCCESS,
    props<{ response: ISearchUsers }>()
);

export const searchUsersByNameErrorAction = createAction(
    EActionTypes.SEARCH_USERS_BY_NAME_ERROR,
    props<{ errors: BackendErrorsType }>()
);

/**
 * action that is used to clear userList state
 */
export const clearUserListAction = createAction(EActionTypes.CLEAR_USER_LIST);
