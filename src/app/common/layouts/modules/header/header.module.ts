import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { ToggleThemeDirective } from './directives/toggle-theme.directive';

@NgModule({
    declarations: [HeaderComponent, ToggleThemeDirective],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RouterLinkWithHref,
        MatMenuModule,
        RouterLinkActive,
        MatSlideToggleModule,
    ],
    exports: [HeaderComponent],
})
export class HeaderModule {}
