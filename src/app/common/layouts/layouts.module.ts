import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterModule } from '@common/layouts/modules/footer/footer.module';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { HeaderModule } from './modules/header/header.module';

@NgModule({
    declarations: [DefaultLayoutComponent],
    imports: [CommonModule, HeaderModule, RouterOutlet, FooterModule],
})
export class LayoutsModule {}
