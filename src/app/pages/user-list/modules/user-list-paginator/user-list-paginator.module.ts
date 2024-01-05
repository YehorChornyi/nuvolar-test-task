import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

import { UserListPaginatorComponent } from './components/user-list-paginator/user-list-paginator.component';

@NgModule({
    declarations: [UserListPaginatorComponent],
    exports: [UserListPaginatorComponent],
    imports: [CommonModule, MatPaginatorModule],
})
export class UserListPaginatorModule {}
