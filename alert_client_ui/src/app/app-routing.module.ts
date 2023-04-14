import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkCloseComponent } from './components/bulk-close/bulk-close.component';
import { CloseAlertComponent } from './components/close-alert/close-alert.component';
import { ComplianceManagerActionComponent } from './components/compliance-manager-action/compliance-manager-action.component';
import { ComplianceOfficerActionComponent } from './components/compliance-officer-action/compliance-officer-action.component';
import { CustomerVerificationComponent } from './components/customer-verification/customer-verification.component';
import { LoginComponent } from './components/login/login.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'home',
    component: MainScreenComponent,
  },
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
  {
    path: 'bulk-close',
    component: BulkCloseComponent,
  },
  {
    path: 'compliance-manager-action',
    component: ComplianceManagerActionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
