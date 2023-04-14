import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertsStreamService {
  private alerts = new Subject<any[]>();
  private bulkCloseAlerts = new BehaviorSubject<any[]>([
    { id: 'Loading...', type: 'Loading...', breachType: 'Loading...' },
  ]);

  setAlerts(alerts: any) {
    this.alerts.next(alerts);
  }

  getAlerts() {
    return this.alerts;
  }

  setAlertsToBulkClose(alerts: any) {
    this.bulkCloseAlerts.next(alerts);
  }

  getAlertsToBulkClose() {
    return this.bulkCloseAlerts;
  }
}
