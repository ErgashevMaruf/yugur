import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {


  private _events: BehaviorSubject<any[] | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) { }

  get events$(): Observable<any[]> {
    return this._events.asObservable();
  }
  getCategories(): Observable<any[]> {
    return this._httpClient.get<any[]>('api/gallery/gallery').pipe(
      tap((response: any) => {
        this._events.next(response);
      })
    );
  }

}

