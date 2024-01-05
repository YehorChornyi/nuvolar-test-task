import { IUser } from '@common/interfaces/user-interface';

/**
 * GET /search/users response interface, represents user list data, with total list items count and array of users
 */
export interface ISearchUsers {
    incomplete_results: boolean;
    items: IUser[];
    total_count: number;
}
