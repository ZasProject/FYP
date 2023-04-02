import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  map,
  Observable,
  Subject,
  Subscription,
  takeUntil,
  toArray,
} from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { AlertsStreamService } from './shared/services/alerts-stream.service';

interface WebSockedData {
  offset: number;
  type: string;
  breachType: string;
  reason: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  socket$: WebSocketSubject<any>;
  receivedData: any[] = [];
  private readonly unsubscribe$ = new Subject<void>();
  stream$: Observable<any[]>;
  data: string;
  subscription$: Observable<Object>;

  constructor(
    private alertService: AlertsStreamService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    setInterval(() => {
      // call the node get api every 10seconds to see if there is any new record. (polling)
      this.getResults().subscribe((response: any) => {
        if (!this.receivedData?.length) {
          // on receiving 1st record, push into receivedData array and save in subjects with setAlerts()
          this.receivedData.push(response);
          this.alertService.setAlerts(this.receivedData);
        } else {
          // on subsequent requests, check if the record is already present to avoid duplicates
          const index = this.receivedData.findIndex(
            (data) => data.id === response?.id
          );
          // index will be -1 if the record is not already present. Then push itto the receivedData array and save insubjects with setAlerts()
          if (index === -1) {
            this.receivedData.push(response);
            this.alertService.setAlerts(this.receivedData);
          }
        }
      });
    }, 10000);
  }

  getResults() {
    // get call to node api
    return this.http.get('http://localhost:3000/stream/example');
  }
}
