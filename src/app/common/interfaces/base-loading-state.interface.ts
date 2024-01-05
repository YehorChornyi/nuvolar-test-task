import { BackendErrorsType } from '@common/interfaces/backend-errors.type';

/**
 * base loading state interface
 */
export interface IBaseLoadingState {
    isLoading: boolean;
    errors: BackendErrorsType | null;
}
