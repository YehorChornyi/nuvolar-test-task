import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserListHttpService } from './user-list-http.service';
import { ISearchUsers } from '../interfaces/search-users.interface';
import { environment } from '@env/environment.prod';

describe('UserListHttpService', () => {
    let service: UserListHttpService;
    let httpTestingController: HttpTestingController;

    const nameQuery = 'Yehor';
    const pageSize = 25;
    const page = 1;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserListHttpService],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(UserListHttpService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('searchUsersByName$()', () => {
        afterEach(() => {
            httpTestingController.verify();
        });

        it('should search gitHub users by provided name using pagination configurations', () => {
            const mockResponse: ISearchUsers = {
                incomplete_results: false,
                items: [],
                total_count: 0,
            };

            service.searchUsersByName$(nameQuery, { page, pageSize }).subscribe((response) => {
                expect(response).toEqual([mockResponse]);
            });

            const req = httpTestingController.expectOne({
                method: 'GET',
                url: `${environment.gitHubApiUrl}/search/users?q=${nameQuery}&per_page=${pageSize}&page=${page}`,
            });
            req.flush([mockResponse]);
        });
    });
});
