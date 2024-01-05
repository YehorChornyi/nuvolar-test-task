import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '@common/layouts/modules/header/components/header/header.component';
import { HeaderModule } from '@common/layouts/modules/header/header.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [HeaderModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
