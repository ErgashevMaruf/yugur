import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface info{
    events:number,
    participants: number,
    organizations: number,
}

@Injectable({
  providedIn: 'root'
})

export class InfoService {


  private _events: BehaviorSubject<info[] | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) { }

  getInfo(): Observable<info[]> {
    return this._httpClient.get<info[]>('api/info/infoData').pipe(
      tap((response: info[]) => {
        this._events.next(response);
      })
    );
  }

}

