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
    { id: 1, value: 'Verified with Customer on Phone', isSelected: false },
    { id: 2, value: 'Card Suspended', isSelected: false },
    { id: 3, value: 'Customer Not Reachable', isSelected: false },
    { id: 4, value: 'Account Suspended', isSelected: false },
    { id: 5, value: 'Customer Failed Security', isSelected: false },
    { id: 6, value: 'Fake Alert', isSelected: false },
  ];
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const serializedObject = this.route.snapshot.params['data'];
    const myObject = JSON.parse(serializedObject);
    this.selectedAlert.push(myObject);
  }

  next() {
    // gets all the checkbox inputs
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]'
    ) as NodeListOf<HTMLInputElement>;
    // create an empty array to store the action taken
    const actionTaken: string[] = [];
    Array.from(checkboxes).forEach((checkbox) => {
      // if a checkbox is checked save the value in the actionTaken array
      if (checkbox.checked) {
        actionTaken.push(checkbox.defaultValue);
      }
    });
    // store it in the selectedAlert array in action taken field so that it can be passed to the next page via query params
    this.selectedAlert[0].actionTaken = actionTaken;
    const selectedData = this.selectedAlert[0];
    const data = JSON.stringify(selectedData);
    //navigate to close alert page
    this.router.navigate(['/close-alert', { data }]);
  }
}
