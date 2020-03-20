import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseURL: string = 'https://localhost:44314/Home/';

  loggedIn : boolean = false;

  public user: User;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { 
    this.loggedIn = !!localStorage.getItem('jwt');
  }

  login(email: string, password: string) : Observable<User> {
    return this.http.post<User>(
      this.baseURL + 'login', 
      JSON.stringify({email, password}),
       this.httpOptions
    ).pipe(tap(data => {
      if (localStorage.getItem('jwt')) {
        localStorage.removeItem('jwt');
      }
      localStorage.setItem('jwt', data['token']);
      this.user = data;
      this.loggedIn = true;
    }));
  }

  logout() {
    localStorage.removeItem('jwt');
    this.user = null;
    this.loggedIn = false;
  }

  /**
   * Add C# method to get user info again
   */
  getUserInfo() {
    if (!localStorage.getItem('jwt')) {
      return;
    }


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
