import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { UserListItemComponent } from './components/user-list-item/user-list-item.component';

@NgModule({
    declarations: [UserListItemComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatChipsModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        RouterModule,
    ],
    exports: [UserListItemComponent],
})
export class UserListItemModule {}
