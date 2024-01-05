import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserListItemComponent } from './user-list-item.component';
import { UserListItemModule } from '../../user-list-item.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserListItemComponent', () => {
    let component: UserListItemComponent;
    let fixture: ComponentFixture<UserListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserListItemComponent],
            imports: [UserListItemModule, HttpClientTestingModule, NoopAnimationsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserListItemComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
