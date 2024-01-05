import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Route, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserListItemModule } from './modules/user-list-item/user-list-item.module';
import { UserListPaginatorModule } from './modules/user-list-paginator/user-list-paginator.module';
import { UserListSearchModule } from './modules/user-list-search/user-list-search.module';
import { UserListHttpService } from './services/user-list-http.service';
import { UserListEffect } from './store/user-list.effect';
import { userListFeature } from './store/user-list.state';

const ROUTES: Route[] = [
    {
        path: '',
        component: UserListComponent,
    },
];

@NgModule({
    declarations: [UserListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        StoreModule.forFeature(userListFeature),
        EffectsModule.forFeature([UserListEffect]),
        UserListItemModule,
        UserListSearchModule,
        MatListModule,
        MatPaginatorModule,
        UserListPaginatorModule,
        MatProgressSpinnerModule,
    ],
    providers: [UserListHttpService],
})
export class UserListModule {}
