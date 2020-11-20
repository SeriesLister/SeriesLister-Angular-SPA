import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserManage } from 'src/app/modules/admin/usermanager/Users';

@Injectable({
  providedIn: 'root'
})
export class UsermanagerService {

  baseURL: string = 'https://localhost:44314/Admin/usermanager';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUsers(page: number) : Observable<UserManage> {
    return this.http.get<UserManage>(this.baseURL + '?page=' + page);
  }

  getUser(id: string) : Observable<UserManage> {
    return this.http.get<UserManage>(this.baseURL + '/edit/' + id);
  }

  editUser(user: UserManage) : Observable<any> {
    return this.http.put(this.baseURL + "/edit/" + user.id, user, this.httpOptions);
  }

  deleteUser(id: string = null) : Observable<any> {
    if (id === null) {
      return;
    }

    return this.http.delete(this.baseURL + '/delete/' + id, this.httpOptions);
  }

}
