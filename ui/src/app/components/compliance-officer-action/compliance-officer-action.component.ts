import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ALERTS } from 'src/app/constants/alerts';
import { AlertsStreamService } from 'src/app/shared/services/alerts-stream.service';
import { CustomerVerificationComponent } from '../customer-verification/customer-verification.component';

@Component({
  selector: 'app-compliance-officer-action',
  templateUrl: './compliance-officer-action.component.html',
  styleUrls: ['./compliance-officer-action.component.css'],
})
export class ComplianceOfficerActionComponent implements OnInit {
  alerts: any[] = [];
  selectedRowId: number;
  selectedAlert: any = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const serializedObject = this.route.snapshot.params['data'];
    const myObject = JSON.parse(serializedObject);
    this.selectedAlert.push(myObject);
  }

  customVerification() {
    const selectedData = this.selectedAlert[0];
    const data = JSON.stringify(selectedData);
    this.router.navigate(['/customer-verification', { data }]);
  }

  suspendAccount() {}
}
