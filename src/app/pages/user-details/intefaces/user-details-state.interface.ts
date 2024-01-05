import { IBaseLoadingState } from '@common/interfaces/base-loading-state.interface';
import { IUserDetails } from './user-details.interface';

export interface IUserDetailsState extends IBaseLoadingState {
    data: IUserDetails | null;
}
