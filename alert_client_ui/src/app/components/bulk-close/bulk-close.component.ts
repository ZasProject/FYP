import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertsStreamService } from 'src/app/shared/services/alerts-stream.service';

@Component({
  selector: 'app-bulk-close',
  templateUrl: './bulk-close.component.html',
  styleUrls: ['./bulk-close.component.css'],
})
export class BulkCloseComponent implements OnInit {
  selectedAlert: any;

  constructor(
    private alertService: AlertsStreamService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.alertService.getAlertsToBulkClose().subscribe((alert) => {
      this.selectedAlert = alert;
    });
  }

  close() {
    const comments = (
      document.getElementById('comments') as HTMLTextAreaElement
    ).value;
    this.selectedAlert.forEach((alert: any) => {
      // send officer comments along with the alerts
      alert.comments = comments;
      this.http
        .post('http://localhost:3000/ams/closeAlert', alert)
        .subscribe((res: any) => {
          if (res.status === 200) {
            this.router.navigate(['/home']);
          }
        });
    });
  }
}
