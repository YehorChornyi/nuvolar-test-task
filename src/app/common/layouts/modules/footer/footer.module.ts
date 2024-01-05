import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [FooterComponent],
    imports: [CommonModule, MatToolbarModule],
    exports: [FooterComponent],
})
export class FooterModule {}
