import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FADE_ANIMATION } from '@common/animations/application.animations';

@Component({
    selector: 'ntt-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [FADE_ANIMATION],
})
export class DefaultLayoutComponent {
    /**
     * get router outlet state to trigger animation
     *
     * @param outlet - router outlet
     */
    getState(outlet: RouterOutlet): string {
        return outlet.activatedRouteData['state']!;
    }
}
