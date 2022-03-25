import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { BehaviorSubject, GroupedObservable, Observable, of } from 'rxjs';
import {
  concatMap,
  groupBy,
  map,
  mergeMap,
  reduce,
  scan,
  tap,
  toArray,
} from 'rxjs/operators';

export interface appointment {
  scheduled: Date;
  client: string;
}
export interface appointmentObservable {
  scheduled: Date;
  clients: appointment[];
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll; // THIS WORKS
  page = 1;
  limit = 15;
  imageData = [];
  page$ = new BehaviorSubject({ page: this.page, limit: this.limit });
  neighbourhoodPosts = this.page$.pipe(
    concatMap(({ page, limit }) => this.loadImageData(page, limit)),
    scan((acc: any[], items: any[]) => [...acc, ...items])
  );

  constructor(private http: HttpClient) {}
  searchNeighbourHoodWithSearchTerms(event) {}
  viewdetails(i) {}

  loadImageData(page, limit) {
    return this.http
      .get(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
      .pipe(tap((data) => console.log(data)));
  }

  loadMorePosts(event) {
    this.page += 1;
    this.page$.next({ page: this.page, limit: this.limit });
    event.target.complete();
  }
}
