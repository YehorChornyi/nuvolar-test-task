import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment.prod';
import { IUserDetails } from '../intefaces/user-details.interface';

@Injectable()
export class UserDetailsHttpService {
    constructor(private readonly httpClient: HttpClient) {}

    /**
     * get gitHub user by provided id
     *
     * @param userId - user id
     */
    getUserById$(userId: string): Observable<IUserDetails> {
        return this.httpClient.get<IUserDetails>(`${environment.gitHubApiUrl}/user/${userId}`);
    }
}
