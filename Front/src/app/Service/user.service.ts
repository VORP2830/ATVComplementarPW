import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map, take } from 'rxjs';
import { environment } from 'src/environments/environments';
import { UserLogin } from '../Models/UserLogin';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSource = new ReplaySubject<any>(1);
  public currentUser$ = this.currentUserSource.asObservable();

  baseUrl = `${environment.apiUrl}/user`

constructor(private http: HttpClient) { }

  public login(model: any): Observable<void> {
    return this.http.post<UserLogin>(this.baseUrl + '/login', model).pipe(
      take(1),
      map((response: any) => {
      const user = response;
      if(user){
        this.setCurrentUser(user);
      }
    })
    );
  }

  public register(model: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + '/create', model).pipe(
      take(1),
      map((response: any) => {
      const user = response;
      if(user){
        this.setCurrentUser(user);
      }
    })
    );
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/').pipe(take(1))
  }

  public put(model: User): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/', model).pipe(take(1))
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null as any);
    this.currentUserSource.complete();
  }

  public setCurrentUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

}
