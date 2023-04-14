import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private userName = new Subject<string>();
  private userType = new Subject<string>();

  setUserName(name: string): void {
    this.userName.next(name); // the next method will set the value to the userName subject.
  }

  getUserName(): Subject<string> {
    // call subscribe() on this method to use the userName value. angular will automatically notify each time the value is set
    return this.userName;
  }

  setUserType(type: string): void {
    this.userType.next(type);
  }

  getUserType(): Subject<string> {
    return this.userType;
  }
}
