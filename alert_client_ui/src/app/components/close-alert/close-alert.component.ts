import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  comments: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const serializedObject = this.route.snapshot.params['data'];
    const myObject = JSON.parse(serializedObject);
    //set isSelectedField field to true for the selected option in customerVerificationOptions, this field will be used to make the checkbox checked on the ui-html
    this.customerVerificationOptions.map((option: any) => {
      // if actionTaken field has a value , then mark the isSelected field agains that option to true and used it in html to show check mark
      option.isSelected = myObject.actionTaken.includes(option.value);
    });
    this.selectedAlert.push(myObject);
    // get comments from previous component data and assign it to comments field and use this in html text area to pre fill the data
    this.comments = this.selectedAlert[0].comments;
  }

  closeAlert() {
    // post api call on close button click
    this.comments = (
      document.getElementById('comments') as HTMLTextAreaElement
    ).value;
    this.selectedAlert[0].comments = this.comments;
    this.http
      .post('http://localhost:3000/ams/closeAlert', this.selectedAlert[0])
      .subscribe((res: any) => {
        if (res.status === 200) {
          alert(res.message); // remove this if you dont want alert popup
          this.router.navigate(['/home']); // navigate to home once done
        }
      });
  }
}
