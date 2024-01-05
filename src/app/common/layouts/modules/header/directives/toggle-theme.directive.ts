import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, Self } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Subject, takeUntil } from 'rxjs';

import { APP_THEME_KEY } from '@common/properties/application.properties';

/**
 * directive that is responsible for toggling dark/light theme by setting classes on elements and localstorage manipulations
 */
@Directive({
    selector: 'mat-slide-toggle[ntt-toggle-theme]',
})
export class ToggleThemeDirective implements OnInit, OnDestroy {
    private readonly classToToggle = 'light-theme';

    private readonly darkThemeKey = 'dark';

    private readonly lightThemeKey = 'light';

    private readonly componentDestroyed$: Subject<void> = new Subject<void>();

    constructor(
        private readonly renderer2: Renderer2,
        private readonly elementRef: ElementRef,
        @Self() private readonly matSlideToggle: MatSlideToggle
    ) {}

    ngOnInit(): void {
        this.checkTheme();
        this.subscribeOnToggleChange();
    }

    /**
     * complete subject on destroy hook for unsubscription
     */
    ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    /**
     * check theme value in localstorage and update slider value
     */
    checkTheme(): void {
        const isLightTheme: boolean = localStorage.getItem(APP_THEME_KEY) === this.lightThemeKey;
        const body: HTMLBodyElement = document.querySelector('body')!;
        const hasClass: boolean = body.classList.contains(this.classToToggle);

        if (isLightTheme) {
            if (!hasClass) {
                this.onThemeChange();
            }

            this.matSlideToggle.writeValue(true);
        }
    }

    /**
     * subscribe on toggle change and switch body class once emitted
     */
    subscribeOnToggleChange(): void {
        this.matSlideToggle.toggleChange.pipe(takeUntil(this.componentDestroyed$)).subscribe(() => {
            this.onThemeChange();
        });
    }

    /**
     * switch body classes on application body and current slide elements, also update localstorage value
     */
    onThemeChange(): void {
        const body: HTMLBodyElement = document.querySelector('body')!;
        const hasClass: boolean = body.classList.contains(this.classToToggle);

        this.renderer2[hasClass ? 'removeClass' : 'addClass'](body, this.classToToggle);
        this.renderer2[hasClass ? 'removeClass' : 'addClass'](this.elementRef.nativeElement, this.classToToggle);
        localStorage.setItem(APP_THEME_KEY, hasClass ? this.darkThemeKey : this.lightThemeKey);
    }
}
