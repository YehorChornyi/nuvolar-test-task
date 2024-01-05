import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { UserListSearchComponent } from './components/user-list-search/user-list-search.component';

@NgModule({
    declarations: [UserListSearchComponent],
    exports: [UserListSearchComponent],
    imports: [CommonModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, MatTooltipModule],
})
export class UserListSearchModule {}
