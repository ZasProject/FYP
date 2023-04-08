import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { ComplianceOfficerActionComponent } from './components/compliance-officer-action/compliance-officer-action.component';
import { CustomerVerificationComponent } from './components/customer-verification/customer-verification.component';
import { HttpClientModule } from '@angular/common/http';
import { CloseAlertComponent } from './components/close-alert/close-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    ComplianceOfficerActionComponent,
    CustomerVerificationComponent,
    CloseAlertComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
