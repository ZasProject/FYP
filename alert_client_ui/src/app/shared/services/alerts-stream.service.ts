import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertsStreamService {
  alerts = new Subject<any[]>();
  private readonly unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  setAlerts(alerts: any) {
    this.alerts.next(alerts);
  }

  getAlerts() {
    return this.alerts;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
