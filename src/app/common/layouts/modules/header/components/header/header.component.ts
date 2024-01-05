import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ERoutes } from '@common/enums/routes.enum';

@Component({
    selector: 'ntt-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    readonly userListRoute: ERoutes.USER_LIST = ERoutes.USER_LIST;
}
