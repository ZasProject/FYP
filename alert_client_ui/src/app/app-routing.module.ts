import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloseAlertComponent } from './components/close-alert/close-alert.component';
import { ComplianceOfficerActionComponent } from './components/compliance-officer-action/compliance-officer-action.component';
import { CustomerVerificationComponent } from './components/customer-verification/customer-verification.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';

const routes: Routes = [
  { path: '', component: MainScreenComponent, pathMatch: 'full' },
  {
    path: 'compliance-officer-action',
    component: ComplianceOfficerActionComponent,
  },
  {
    path: 'customer-verification',
    component: CustomerVerificationComponent,
  },
  {
    path: 'close-alert',
    component: CloseAlertComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
