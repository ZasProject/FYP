import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from '../../shared/services/user-details.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  selectedUserType = 'compliance-officer';
  private userName = '';
  private password = '';
  constructor(
    private router: Router,
    private userDetails: UserDetailsService
  ) {}

  login() {
    this.userName = (
      document.getElementById('userName') as HTMLInputElement
    ).value; // gets the value entered by the user in userName text field and saves in userName variable
    this.password = (
      document.getElementById('password') as HTMLInputElement
    ).value; // gets the value entered by the user in password text field and saves in password variable
    if (this.userName && this.password) {
      this.userDetails.setUserName(this.userName); // sets userName subject that can be used later in a different component
      this.userDetails.setUserType(this.selectedUserType); // sets userType subject that can be used later in a different component
      if (this.selectedUserType === 'compliance-manager') {
        // if user selecred compliance-manager as user type, navigate to compliance-manager-action path
        this.router.navigate(['/compliance-manager-action']);
      } else {
        this.router.navigate(['/home']); // else navigate to home path
      }
    } else {
      alert('Please enter username and password'); // if user didnot enter credential inform to enter the values
    }
  }

  onSelect(event: any) {
    this.selectedUserType = event.target.value;
  }
}
