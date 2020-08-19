import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { AuthService } from '../../authentication.service';
import { AnimeSeries } from 'src/app/shared/models/AnimeSeries';
import { AdminService } from '../admin.service';
import { AnimeListedResponse } from '@app/shared/models/responses/impl/anime/anime-listed-response';
import { EndPointsConfigurations } from '@app/configs/endpointsconfiguration';
import { AnimeResponse } from '@app/shared/models/responses/impl/anime/anime-response';
import { BasicResponse } from '@app/shared/models/responses/basic-response';

@Injectable({
  providedIn: 'root',
})
export class AnimeService extends AdminService {

  baseURL: string = 'https://localhost:5001/Admin/animeseries';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  //, "Authorization" :  'Bearer ' + this.authService.user.token }

  constructor(private http: HttpClient,
    private authService: AuthService) {
      super();
  }

  /**
   * Gets the requested anime page list with the page number
   * @param page the page number to get
   */
  public requestListedAnime(page: number = 1): Observable<AnimeListedResponse> {
    return this.http.get<AnimeListedResponse>(
      EndPointsConfigurations.ANIMELISTEDURL + '?page=' + page
    )
  }

  /**
   * Requests the anime details from the server
   * @param id the id to get the anime
   */
  public requestAnimeDetails(id: number = 0): Observable<AnimeResponse> {
    if (id == 0) {
      return EMPTY;
    }
    return this.http.get<AnimeResponse>(
      EndPointsConfigurations.ANIMEDETAILSURL + '?id=' + id
    )
  }

  /**
   * Requests the server to delete the anime
   * @param id The id of the anime
   */
  public requestAnimeDeletion(id: number = 0): Observable<BasicResponse> {
    return this.http.delete<BasicResponse>(
      EndPointsConfigurations.ANIMEDELETEURL + '?id=' + id
    )
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

  /**
   * Parses the date string to localetime without time
   * @param date The date to parse
   */
  public ParseDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

}
