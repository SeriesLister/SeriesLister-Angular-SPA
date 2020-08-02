import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AuthService } from './auth-service.service';
import { AnimeSeries } from 'src/app/shared/models/AnimeSeries';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  baseURL: string = 'https://localhost:44314/Admin/animeseries';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  //, "Authorization" :  'Bearer ' + this.authService.user.token }

  constructor(private http: HttpClient, 
    private date: DatePipe, 
    private authService: AuthService) {
    }

  getAnimeSeries(page: number = 1): Observable<AnimeSeries[]> {
    return this.http.get<AnimeSeries[]>(this.baseURL + '?page=' + page, this.httpOptions);
  }

  getAnimeDetails(id: number = 1): Observable<AnimeSeries> {
    return this.http.get<AnimeSeries>(this.baseURL + "/edit/" + id, this.httpOptions);
  }

  createAnimeSeries(series: AnimeSeries): Observable<any> {
    return this.http.post(this.baseURL + "/create", JSON.stringify(series), this.httpOptions);
  }

  editAnimeDetails(series: AnimeSeries): Observable<any> {
    return this.http.put(this.baseURL + "/edit/" + series.id, series, this.httpOptions);
  }

  deleteSeries(id: number = 0) : Observable<any> {
    if (id === 0) {
      return;
    }
    return this.http.delete(this.baseURL + "/delete/" + id, this.httpOptions);
  }

  public scrubSeriesA(series: AnimeSeries[], EUFormat: boolean = false) : AnimeSeries[] {
    var dateFormat : string = EUFormat ? 'yyyy-MM-dd' : 'MM-dd-yyyy';
    var temp : AnimeSeries[] = [];
    series.forEach(element => {
      element.finishDate = this.date.transform(element.finishDate, dateFormat);
      element.releaseDate = this.date.transform(element.releaseDate, dateFormat);
      temp.push(element);
    });
    return temp;
  }

  public scrubSeries(series: AnimeSeries, EUFormat: boolean = false) : AnimeSeries {
    var dateFormat : string = EUFormat ? 'yyyy-MM-dd' : 'MM-dd-yyyy';
    series.finishDate = this.date.transform(series.finishDate, dateFormat);
    series.releaseDate = this.date.transform(series.releaseDate, dateFormat);
    return series;
  }

}