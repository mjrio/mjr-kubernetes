import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public data: string[] = [];
    public isPolling = false;

    private pollingSubscription = new Subscription();

    constructor(private httpClient: HttpClient) {}
    public getData(): void {
        this.getDataRequest().subscribe();
    }
    private getDataRequest(): Observable<void> {
        return this.httpClient
            .get(`${environment.dotnetApiUrl}/date`, {
                responseType: 'text',
            })
            .pipe(
                map((text) => {
                    this.data = [text, ...this.data];
                })
            );
    }
    public startPolling(): void {
        this.isPolling = true;
        this.pollingSubscription.add(
            timer(0, 1000)
                .pipe(switchMap(() => this.getDataRequest()))
                .subscribe()
        );
    }
    public stopPolling(): void {
        this.isPolling = false;
        this.pollingSubscription.unsubscribe();
    }
}
