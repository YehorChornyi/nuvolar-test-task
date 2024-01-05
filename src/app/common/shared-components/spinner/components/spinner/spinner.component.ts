import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, finalize, skip, startWith, tap } from 'rxjs/operators';

import { ILoaderState } from '../../interfaces/loader-state.interface';

const LOADER_SUBJECT$: Subject<ILoaderState> = new Subject<ILoaderState>();
const LOADER_STATE$: Observable<ILoaderState> = LOADER_SUBJECT$.asObservable();

/**
 * show spinner
 */
export const showSpinner = (): void => {
    LOADER_SUBJECT$.next(<ILoaderState>{ toShow: true });
};

/**
 * hide spinner
 */
export const hideSpinner = (): void => {
    LOADER_SUBJECT$.next(<ILoaderState>{ toShow: false });
};

/**
 * this function is created for usage within .pipe before .subscribe
 * it will show spinner before request & hide it in any case of response
 * (success, error, cancellation)
 * preferable to use it at first place inside .pipe()
 */
export const useSpinner =
    () =>
    <T>(source$: Observable<T>): Observable<T> =>
        source$.pipe(
            startWith('🖖' as any),
            tap((e: any): void => {
                e === '🖖' && showSpinner();
            }),
            skip(1),
            finalize(() => {
                hideSpinner();
            })
        );

@Component({
    selector: 'ntt-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
    protected toShow: boolean = false;

    private trueStates: number = 0;

    private falseStates: number = 0;

    ngOnInit(): void {
        this.subscribeOnLoaderState();
    }

    /**
     * subscribe on loader state
     *
     * trueStates is count of true toShow emitions
     * falseStates is count of true toShow emitions
     *
     * if trueStates value is greater than falseStates it means that at least one API call hasn't finished,
     * so we should set toShow to true
     *
     * @private
     */
    private subscribeOnLoaderState(): void {
        const loaderStateDelay: number = 100;

        LOADER_STATE$.pipe(delay(loaderStateDelay)).subscribe(({ toShow }: ILoaderState) => {
            toShow ? this.trueStates++ : this.falseStates++;

            if (this.trueStates <= this.falseStates) {
                this.trueStates = this.falseStates = 0;
            }

            this.toShow = this.trueStates > this.falseStates;
        });
    }
}
