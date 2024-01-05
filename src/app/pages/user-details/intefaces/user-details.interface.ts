import { IUser } from '@common/interfaces/user-interface';

/**
 * GET user/:id response interface, represents searched user details
 */
export interface IUserDetails extends IUser {
    name?: string;
    company?: string;
    blog?: string;
    location?: string;
    email?: string;
    hireable?: boolean;
    bio?: string;
    twitter_username?: string;
    public_repos?: number;
    public_gists?: number;
    followers?: number;
    following?: number;
    created_at?: string;
    updated_at?: string;
}
