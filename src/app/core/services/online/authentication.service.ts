import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, empty, EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JWTokenHandler } from '../../handlers/jwtokenhandler'
import { User } from 'src/app/shared/models/User';
import { AlertService } from '../offfline/alert.service';
import { LoginResponse } from 'src/app/shared/models/responses/impl/loginresponse';
import { EndPointsConfigurations } from 'src/app/configs/endpointsconfiguration';
import { RegistrationResponse } from 'src/app/shared/models/responses/impl/registrationresponse';
import { BasicResponse } from '@app/shared/models/responses/basicresponse';
import { UserHandler } from '@app/core/handlers/userhandler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * The user handling class that contains our user
   */
  public userHandler: UserHandler = new UserHandler();

  /**
   * The jwtoken handling class that contains our tokens
   */
  public jwTokens : JWTokenHandler = new JWTokenHandler();

  constructor(private http: HttpClient, private router: Router, private notification: AlertService) {
    if (this.userHandler.findUserFromLocal()) {
      this.jwTokens = this.jwTokens.retrieveTokensInternal();
    }
  }

  /**
   * Checks if the user is logged, if the user is redirect
   * @param route By default it's the root route /, specify route to redirect user
  */
  public redirectOnLogin(route: string = '/') : void {
    if (this.userHandler.isUserExisting()) {
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
      {email, password, rememberMe}
    ).pipe(tap((response: LoginResponse) => {
      if (response.success) {
        this.userHandler.addUser(new User(response.email, response.username));
        this.jwTokens.setTokens(response.token, response.refreshToken);
      }
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
      }
    );
  }

  /**
   * Checks if the username is taken
   * @param displayName The display name to check
   */
  public checkUsername(displayName: string) : Observable<BasicResponse> {
    return this.http.post<BasicResponse>(
      EndPointsConfigurations.CHECKUSERNAME + displayName,
      EMPTY
    );
  }

  /**
   * Checks if the email is taken
   * @param email The email to check
   */
  public checkEmail(email: string) : Observable<BasicResponse> {
    return this.http.post<BasicResponse>(
      EndPointsConfigurations.CHECKEMAIL + email,
      EMPTY
    );
  }

  /**
   * Sends a post request to the server, and return new tokens
   * @param email The email of the user
   * @param refreshToken The refresh token
   */
  public refreshTokens(email : string, refreshToken : string) : Observable<any> {
    return this.http.post<any>(EndPointsConfigurations.REFRESHTOKENURL, {email, refreshToken});
  }

  /**
   * Removes the current user from the localstorage, and sets the user to null
   */
  public logout() : void {
    this.userHandler.removeUser();
    this.jwTokens.clearTokens();
  }

}
