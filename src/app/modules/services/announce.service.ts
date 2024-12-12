import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable,tap,switchMap,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface announce {
    title: string
    text: string,
    date: Date,
  }

@Injectable({
  providedIn: 'root'
})
export class AnnounceService {

    private _announce: BehaviorSubject<announce[]> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }
getCategories(): Observable<announce[]> {
    return this._httpClient.get<announce[]>('api/apps/announcements/announcements').pipe(
      tap((response: any) => {
        this._announce.next(response);
      })
    );
  }

}
