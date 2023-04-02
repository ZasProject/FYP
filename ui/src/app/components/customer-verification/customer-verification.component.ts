import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ALERTS } from 'src/app/constants/alerts';

@Component({
  selector: 'app-customer-verification',
  templateUrl: './customer-verification.component.html',
  styleUrls: ['./customer-verification.component.css'],
})
export class CustomerVerificationComponent implements OnInit {
  alerts: any[];
  selectedRowId: number;
  selectedAlert: any[] = [];

  customerVerificationOptions = [
    { id: 1, value: 'Verified with Customer on Phone' },
    { id: 2, value: 'Card Suspended' },
    { id: 3, value: 'Customer Not Reachable' },
    { id: 4, value: 'Account Suspended' },
    { id: 5, value: 'Customer Failed Security' },
    { id: 6, value: 'Fake Alert' },
  ];
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const serializedObject = this.route.snapshot.params['data'];
    const myObject = JSON.parse(serializedObject);
    this.selectedAlert.push(myObject);
  }

  next() {}
}
