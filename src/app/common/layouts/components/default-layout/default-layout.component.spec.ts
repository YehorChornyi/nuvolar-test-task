import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultLayoutComponent } from './default-layout.component';
import { LayoutsModule } from '@common/layouts/layouts.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DefaultLa', () => {
    let component: DefaultLayoutComponent;
    let fixture: ComponentFixture<DefaultLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DefaultLayoutComponent],
            imports: [LayoutsModule, RouterTestingModule, NoopAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultLayoutComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
