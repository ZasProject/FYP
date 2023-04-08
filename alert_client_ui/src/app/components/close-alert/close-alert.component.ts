import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-close-alert',
  templateUrl: './close-alert.component.html',
  styleUrls: ['./close-alert.component.css'],
})
export class CloseAlertComponent implements OnInit {
  selectedAlert: any = [];
  customerVerificationOptions = [
    { id: 1, value: 'Verified with Customer on Phone', isSelected: false },
    { id: 2, value: 'Card Suspended', isSelected: false },
    { id: 3, value: 'Customer Not Reachable', isSelected: false },
    { id: 4, value: 'Account Suspended', isSelected: false },
    { id: 5, value: 'Customer Failed Security', isSelected: false },
    { id: 6, value: 'Fake Alert', isSelected: false },
  ];
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const serializedObject = this.route.snapshot.params['data'];
    const myObject = JSON.parse(serializedObject);
    //set isSelectedField field to true for the selected option in customerVerificationOptions, this field will be used to make the checkbox checked on the ui-html
    this.customerVerificationOptions.map((option: any) => {
      option.isSelected = myObject.actionTaken.includes(option.value);
    });
    this.selectedAlert.push(myObject);
  }

  closeAlert() {
    // post api call on close button click
    this.http
      .post('http://localhost:3000/ams/closeAlert', this.selectedAlert[0])
      .subscribe((res) => console.log(res));
  }
}
