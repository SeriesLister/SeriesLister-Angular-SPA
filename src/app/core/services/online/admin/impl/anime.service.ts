import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
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

  constructor(private http: HttpClient) {
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

  /**
   * Requests the server for new anime creation
   * @param series the series to send
   */
  public requestAnimeCreation(series: AnimeSeries): Observable<BasicResponse> {
    return this.http.post<BasicResponse>(
      EndPointsConfigurations.ANIMECREATEURL,
      series
    )
  }

  /**
   * Requests the anime to update to server
   * @param series the series to update with
   */
  public requestAnimeUpdate(series: AnimeSeries): Observable<BasicResponse> {
    return this.http.patch<BasicResponse>(
      EndPointsConfigurations.ANIMEUPDATEURL,
      series
    )
  }

  /**
   * Parses the date string to localetime without time
   * @param date The date to parse
   */
  public ParseDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

}
