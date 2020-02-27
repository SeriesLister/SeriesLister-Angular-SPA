import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { AnimeSeries } from '../admin/animeseries/AnimeSeries';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  baseURL: string = 'https://localhost:44314/Admin/animeseries';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAnimeSeries(page: number = 1): Observable<AnimeSeries[]> {
    return this.http.get<AnimeSeries[]>(this.baseURL + '?page=' + page)
      .pipe();
  }

  getAnimeDetails(id: number = 1): Observable<AnimeSeries> {
    return this.http.get<AnimeSeries>(this.baseURL + "/edit/" + id);
  }

  postAnimeDetails(series: AnimeSeries): Observable<any> {
    return this.http.put(this.baseURL + "/edit/" + series.id, series, this.httpOptions);
  }

}
