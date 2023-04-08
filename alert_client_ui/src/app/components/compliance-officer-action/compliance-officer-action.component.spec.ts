import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceOfficerActionComponent } from './compliance-officer-action.component';

describe('ComplianceOfficerActionComponent', () => {
  let component: ComplianceOfficerActionComponent;
  let fixture: ComponentFixture<ComplianceOfficerActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplianceOfficerActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceOfficerActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
