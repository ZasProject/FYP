import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerVerificationComponent } from '../customer-verification/customer-verification.component';

@Component({
  selector: 'app-compliance-officer-action',
  templateUrl: './compliance-officer-action.component.html',
  styleUrls: ['./compliance-officer-action.component.css'],
})
export class ComplianceOfficerActionComponent implements OnInit {
  selectedAlert: any = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const serializedObject = this.route.snapshot.params['data']; // access the selectedRow data from query params
    const myObject = JSON.parse(serializedObject); // convert serialized data back to object  notation
    this.selectedAlert.push(myObject); // save in selectedAlert array and use it to show the rows in the html
  }

  customVerification() {
    const selectedData = this.selectedAlert[0];
    const data = JSON.stringify(selectedData);
    // navigate to customer verification page and send the selected alert details in the url query params
    this.router.navigate(['/customer-verification', { data }]);
  }

  suspendAccount() {
    const selectedData = this.selectedAlert[0];
    const data = JSON.stringify(selectedData);
    //navigate to close alert page
    this.router.navigate(['/close-alert', { data }]);
  }
}
