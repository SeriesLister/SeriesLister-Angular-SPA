import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../admin/usermanager/Users';

@Injectable({
  providedIn: 'root'
})
export class UsermanagerService {

  baseURL: string = 'https://localhost:44314/Admin/usermanager';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUsers(page: number) : Observable<User> {
    return this.http.get<User>(this.baseURL + '?page=' + page);
  }

}
