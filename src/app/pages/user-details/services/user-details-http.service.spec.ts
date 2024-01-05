import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '@env/environment.prod';
import { UserDetailsHttpService } from './user-details-http.service';
import { IUserDetails } from '../intefaces/user-details.interface';

describe('UserDetailsHttpService', () => {
    let service: UserDetailsHttpService;
    let httpTestingController: HttpTestingController;

    const userId = '000';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserDetailsHttpService],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(UserDetailsHttpService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getUserById$()', () => {
        afterEach(() => {
            httpTestingController.verify();
        });

        it('should get gitHub user by provided id', () => {
            const mockResponse: IUserDetails = {
                followers: 100,
            } as IUserDetails;

            service.getUserById$(userId).subscribe((response) => {
                expect(response).toEqual([mockResponse]);
            });

            const req = httpTestingController.expectOne({
                method: 'GET',
                url: `${environment.gitHubApiUrl}/user/${userId}`,
            });
            req.flush([mockResponse]);
        });
    });
});
