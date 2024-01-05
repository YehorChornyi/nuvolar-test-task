import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IPaginatorConfig } from '@common/interfaces/paginator-config.interface';
import { environment } from '@env/environment.prod';
import { ISearchUsers } from '../interfaces/search-users.interface';

@Injectable()
export class UserListHttpService {
    constructor(private readonly httpClient: HttpClient) {}

    /**
     * search gitHub users by provided name using pagination configurations
     *
     * @param nameQuery - name query to search
     * @param paginatorConfig - name query to search
     */
    searchUsersByName$(nameQuery: string, paginatorConfig: IPaginatorConfig): Observable<ISearchUsers> {
        return this.httpClient.get<ISearchUsers>(
            `${environment.gitHubApiUrl}/search/users?q=${nameQuery}&per_page=${paginatorConfig.pageSize}&page=${paginatorConfig.page}`
        );
    }
}
