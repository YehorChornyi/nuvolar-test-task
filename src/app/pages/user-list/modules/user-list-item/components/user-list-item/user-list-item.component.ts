import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ERoutes } from '@common/enums/routes.enum';
import { IUser } from '@common/interfaces/user-interface';

@Component({
    selector: 'ntt-user-list-item',
    templateUrl: './user-list-item.component.html',
    styleUrls: ['./user-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListItemComponent {
    @Input() user: IUser | null = null;

    readonly userDetailsRoute: ERoutes.USER_DETAILS = ERoutes.USER_DETAILS;
}
