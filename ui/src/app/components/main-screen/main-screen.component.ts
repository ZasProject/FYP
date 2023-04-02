import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsStreamService } from 'src/app/shared/services/alerts-stream.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],
})
export class MainScreenComponent implements OnInit {
  alerts: any[] = [];

  selectedRows: any[] = [];
  showMainScreen = true;
  selectedAlertId: number;
  constructor(
    private route: Router,
    private alertService: AlertsStreamService
  ) {}

  ngOnInit(): void {
    this.alertService.getAlerts().subscribe((data) => {
      this.alerts = data;
    });
  }

  action() {
    const selectedData = this.selectedRows[0];
    const data = JSON.stringify(selectedData);
    this.route.navigate(['/compliance-officer-action', { data }]);
  }

  forward() {}

  close() {}

  selectAlert(event: any, i: number) {
    const checkValue = event.target.checked;
    const j = this.alerts.findIndex((row) => row.id === i);
    if (checkValue) {
      this.selectedAlertId = i;
      this.selectedRows.push({
        id: i,
        type: this.alerts[j].type,
        breachType: this.alerts[j].breachType,
        reason: this.alerts[j].reason,
      });
    } else {
      const index = this.selectedRows.findIndex((row) => row.id === i);
      if (index > -1) {
        this.selectedRows.splice(index, 1);
      }
    }
  }
}
