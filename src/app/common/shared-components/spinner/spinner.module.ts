import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
    declarations: [SpinnerComponent],
    exports: [SpinnerComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatProgressBarModule],
})
export class SpinnerModule {}
