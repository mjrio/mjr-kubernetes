import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
    DEFAULT_TIMEOUT,
    TimeoutInterceptor,
} from 'src/app/http-timeout.interceptor';

@NgModule({
    imports: [BrowserModule, CommonModule, HttpClientModule],
    declarations: [AppComponent],
    providers: [
        [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: TimeoutInterceptor,
                multi: true,
            },
        ],
        [{ provide: DEFAULT_TIMEOUT, useValue: 1000 }],
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
