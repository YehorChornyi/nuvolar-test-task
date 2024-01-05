import { animate, group, query, style, transition, trigger } from '@angular/animations';

/**
 * fade animation, simply changes opacity from 0 to 1 when item is shown and backwards when disappeared
 */
export const FADE_ANIMATION = trigger('routeAnimations', [
    transition('* => *', [
        group([
            query(':enter', [style({ opacity: 0 }), animate('430ms ease-in-out', style({ opacity: 1 }))], {
                optional: true,
            }),
            query(':leave', [style({ opacity: 1 }), animate('430ms ease-in-out', style({ opacity: 0 }))], {
                optional: true,
            }),
        ]),
    ]),
]);
