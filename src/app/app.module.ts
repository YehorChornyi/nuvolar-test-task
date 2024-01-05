import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HandleErrorInterceptor } from '@common/interceptors/handle-error.interceptor';
import { LoadingStateInterceptor } from '@common/interceptors/loading-state.interceptor';
import { FooterModule } from '@common/layouts/modules/footer/footer.module';
import { HeaderModule } from '@common/layouts/modules/header/header.module';
import { SpinnerModule } from '@common/shared-components/spinner/spinner.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 20,
            logOnly: true,
        }),
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SpinnerModule,
        MatSnackBarModule,
        FooterModule,
        HeaderModule,
    ],
    providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
        { provide: HTTP_INTERCEPTORS, useClass: LoadingStateInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HandleErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
