import { IBaseLoadingState } from '@common/interfaces/base-loading-state.interface';
import { ISearchUsers } from './search-users.interface';

/**
 * search user state interface
 */
export interface ISearchUsersState extends IBaseLoadingState {
    data: ISearchUsers | null;
}
