import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from './shared/services/user-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userName = '';
  userType = '';

  constructor(private userDetails: UserDetailsService) {}

  ngOnInit() {
    this.userDetails.getUserName().subscribe((name: string) => {
      this.userName = name;
    });
    this.userDetails.getUserType().subscribe((type: string) => {
      this.userType = type;
    });
  }

  getDate() {
    return new Date();
  }
}
