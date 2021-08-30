import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public data: string[] = [];
    private pollingSubject = new Subject<boolean>();
    constructor(private httpClient: HttpClient) {}
    public getData(): void {
        this.httpClient
            .get<string>(`${environment.dotnetApiUrl}/date`)
            .pipe(
                tap((text) => {
                    this.data = [text, ...this.data];
                })
            )
            .subscribe();
    }
    public startPolling(): void {
        this.pollingSubject.next(true);
    }
    public stopPolling(): void {
        this.pollingSubject.next(false);
    }
}
