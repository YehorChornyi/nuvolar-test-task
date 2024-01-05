import { createAction, props } from '@ngrx/store';

import { BackendErrorsType } from '@common/interfaces/backend-errors.type';
import { EActionTypes } from '../enums/action-types.enum';
import { IUserDetails } from '../intefaces/user-details.interface';

/**
 * get user actions
 */
export const getUserByIdAction = createAction(EActionTypes.GET_USER_BY_ID, props<{ userId: string }>());

export const getUserByIdSuccessAction = createAction(
    EActionTypes.GET_USER_BY_ID_SUCCESS,
    props<{ response: IUserDetails }>()
);

export const getUserByIdErrorAction = createAction(
    EActionTypes.GET_USER_BY_ID_ERROR,
    props<{ errors: BackendErrorsType }>()
);

/**
 * action that is used to clear userDetails state
 */
export const clearUserDetailsAction = createAction(EActionTypes.CLEAR_USER_LIST);
