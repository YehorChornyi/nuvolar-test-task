import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Route, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserDetailsHttpService } from './services/user-details-http.service';
import { UserDetailsEffect } from './store/user-details.effect';
import { userDetailsFeature } from './store/user-details.state';

const ROUTES: Route[] = [
    {
        path: '',
        component: UserDetailsComponent,
    },
];

@NgModule({
    declarations: [UserDetailsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        StoreModule.forFeature(userDetailsFeature),
        EffectsModule.forFeature([UserDetailsEffect]),
        MatProgressSpinnerModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
    ],
    providers: [UserDetailsHttpService],
})
export class UserDetailsModule {}
