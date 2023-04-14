import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertsStreamService } from 'src/app/shared/services/alerts-stream.service';

@Component({
  selector: 'app-compliance-manager-action',
  templateUrl: './compliance-manager-action.component.html',
  styleUrls: ['./compliance-manager-action.component.css'],
})
export class ComplianceManagerActionComponent implements OnInit, OnDestroy {
  receivedData: any[] = [];
  private subscription = new Subscription();
  private interval: NodeJS.Timeout;
  selectedRows: any[] = [];
  constructor(
    private http: HttpClient,
    private alertService: AlertsStreamService,
    private router: Router
  ) {}

  ngOnInit() {
    // call the node get api every 10seconds to see if there is any new record. (polling)
    this.subscription = this.getResults().subscribe((response: any) => {
      if (!this.receivedData?.length) {
        // on receiving 1st record, push into receivedData array and save in subjects with setAlerts()
        this.receivedData.push(response);
      } else {
        // on subsequent requests, check if the record is already present to avoid duplicates
        const index = this.receivedData.findIndex(
          (data) => data.id === response?.id
        );
        // index will be -1 if the record is not already present. Then push itto the receivedData array and save insubjects with setAlerts()
        if (index === -1) {
          this.receivedData.push(response);
        }
      }
    });
  }

  selectAlert(event: any, i: number) {
    const checkValue = event.target.checked; // gets the value of checkbox if checked or unchecked when user clicks
    const j = this.receivedData.findIndex((row) => row.id === i); // checks which record, from the list of alerts(received data) , did the user select
    if (checkValue) {
      // if user checked the checkbox
      // pushes the value into an array (selectedRows)
      this.selectedRows.push({
        id: i,
        type: this.receivedData[j].type,
        breachType: this.receivedData[j].breachType,
        reason: this.receivedData[j].reason,
        email: this.receivedData[j].email,
        phone: this.receivedData[j].phone,
      });
    } else {
      // if user unselects the checkbox, removes the value from the selectedRows array that was pushed when it was previously selected
      const index = this.selectedRows.findIndex((row) => row.id === i); //finds at which index the alert was saved in the selectedRows array
      if (index > -1) {
        //index will be -1 if the row not found
        this.selectedRows.splice(index, 1); // splice is used to remove that index
      }
    }
  }

  private getResults() {
    // get call to node api
    return this.http.get(
      'http://localhost:3000/stream/complianceManagerAlerts'
    );
  }

  close() {
    this.alertService.setAlertsToBulkClose(this.selectedRows);
    this.subscription.unsubscribe(); // stop listening to the service once user navigates
    this.router.navigate(['/bulk-close']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // stop listening to the service once user navigates
  }
}
