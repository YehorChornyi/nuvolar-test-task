import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ERoutes } from '@common/enums/routes.enum';
import { DefaultLayoutComponent } from '@common/layouts/components/default-layout/default-layout.component';
import { LayoutsModule } from '@common/layouts/layouts.module';

const ROUTES: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {
                path: ERoutes.USER_LIST,
                loadChildren: () => import('./pages/user-list/user-list.module').then((m) => m.UserListModule),
                data: { state: 'userList' },
            },
            {
                path: `${ERoutes.USER_DETAILS}/:userId`,
                loadChildren: () => import('./pages/user-details/user-details.module').then((m) => m.UserDetailsModule),
                data: { state: 'userDetails' },
            },
            {
                path: '**',
                redirectTo: ERoutes.USER_LIST,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES), LayoutsModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
