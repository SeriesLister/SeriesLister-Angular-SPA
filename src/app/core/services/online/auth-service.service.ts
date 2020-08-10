import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JWTokens } from '../../jwt/JWTokens'
import { User } from 'src/app/shared/models/User';
import { AlertService } from '../offfline/alert.service';
import { LoginResponse } from 'src/app/shared/models/responses/impl/loginresponse';
import { EndPointsConfigurations } from 'src/app/configs/endpointsconfiguration';
import { RegistrationResponse } from 'src/app/shared/models/responses/impl/registrationresponse';
import { BasicResponse } from '@app/shared/models/responses/basicresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string = 'https://localhost:44314/Home/';

  loggedIn : boolean = false;

  public user: User = null;

  public jwTokens : JWTokens = new JWTokens();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router, private notification: AlertService) {
    if (localStorage.getItem('currentUser') && !this.loggedIn) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.jwTokens = this.jwTokens.retrieveTokenInternal();
      this.loggedIn = true;
    }
  }

  /**
   * Checks if the user is logged, if the user is redirect
   * @param route By default it's the root route /, specify route to redirect user
  */
  public redirectOnLogin(route: string = '/') : void {
    if (this.loggedIn) {
      this.router.navigateByUrl(route);
    }
  }

  /**
   * Sends the server the request to login
   * Returns an interface login
   * @param email The email to send the server
   * @param password The password to send the server
   * @param rememberMe The remember option to send the server
   */
  public login(email: string, password: string, rememberMe: boolean) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      EndPointsConfigurations.LOGINURL,
      {email, password, rememberMe},
       this.httpOptions
    ).pipe(tap(data => {
      // var user: User = data as User;
      // this.user = user;
      // this.jwTokens = new JWTokens(data['refreshToken'], data['token']);
      // this.jwTokens.storeTokensInternal();
      // localStorage.setItem('currentUser', JSON.stringify(this.user));
      // this.loggedIn = true;
    }));
  }

  /**
   * Sends a request to the server to try to register the user
   * Returns the interface RegistrationResponse
   * @param email The email for the user to register with
   * @param displayName The display name for the user to register with
   * @param password The password for the user to register with
  */
  public register(email: string, displayName: string, password: string) : Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(
      EndPointsConfigurations.REGISTERURL, 
      {
        email,
        displayName,
        password
      }, 
      this.httpOptions
    );
  }

  /**
   * Checks if the username is taken
   * @param displayName The display name to check
  */
  public checkUsername(displayName: string) : Observable<BasicResponse> {
    return this.http.post<BasicResponse>(
      EndPointsConfigurations.CHECKUSERNAME + displayName,
      this.httpOptions
    );
  }

  /**
   * Checks if the email is taken
   * @param email The email to check
  */
  public checkEmail(email: string) : Observable<BasicResponse> {
    return this.http.post<BasicResponse>(
      EndPointsConfigurations.CHECKEMAIL + email,
      this.httpOptions
    );
  }

  public refreshTokens(email : string, refreshToken : string) : Observable<any> {
    return this.http.post<any>(this.baseURL + 'refresh', JSON.stringify({email, refreshToken}), this.httpOptions);
  }

  /**
   * Removes the current user from the localstorage, and sets the user to null
   */
  public logout() : void {
    localStorage.removeItem('currentUser');
    this.jwTokens.clearTokens();
    this.jwTokens = null;
    this.user = null;
    this.loggedIn = false;
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
