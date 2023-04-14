/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserDetailsService } from './user-details.service';

describe('Service: UserDetails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDetailsService]
    });
  });

  it('should ...', inject([UserDetailsService], (service: UserDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
