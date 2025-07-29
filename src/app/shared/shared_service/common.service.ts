import { Injectable, signal } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtInterceptor } from './jwt.interceptor';


providers: [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
]

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  private apiUrl = 'http://127.0.0.1:8000'; // Replace with your API endpoint
  private accessTokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';
  private userNameKey = 'userName';
  private roleKey = 'role';
  private FirstName = 'first_name';
  private LastName = 'last_name';

  public loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  public userNameSubject = new BehaviorSubject<string>(this.getStoredUserName());
  public roleSubject = new BehaviorSubject<string>(this.getStoredRole());
  public firstName = new BehaviorSubject<string>(this.getfirstName());
  public lastName = new BehaviorSubject<string>(this.getlastName());



  constructor(private http: HttpClient, private router: Router) { }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token/refresh/`, {
      refresh: this.getRefreshToken()
    }).pipe(
      tap((tokens) => {
        localStorage.setItem(this.accessTokenKey, tokens.access);
        if (tokens.refresh) {
          localStorage.setItem(this.refreshTokenKey, tokens.refresh);
        }
      })
    );
  }

  getCaptcha(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get_captcha`, { observe: 'response' })
  }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { loginData }).pipe(
      map(response => {
        if (response) {
          this.setTokens(response.response.access, response.response.refresh, response.response.email, response.response.role, response.response.first_name, response.response.last_name);
          this.loggedIn.next(true);
        }
        return response;
      })
    );
  }

  resetPassword(old_password: string, new_password1: string, new_password2: string): Observable<any> {
    const payload = { old_password, new_password1, new_password2 };
    return this.http.put<any>(`${this.apiUrl}/passwordReset`, payload).pipe(
      catchError(error => {
        console.error('Error in resetPassword:', error);
        return throwError(error);
      })
    );
  }

  logout(): void {
    this.removeTokens();
    this.loggedIn.next(false);
    this.router.navigate(['/']);
    console.log('Logged out, loggedIn:', this.loggedIn.value);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.accessTokenKey);
  }

  isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setTokens(accessToken: string, refreshToken: string, userName: string, role: any, firstName: string, lastName: string,): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    localStorage.setItem(this.userNameKey, userName);
    localStorage.setItem(this.roleKey, role);
    localStorage.setItem(this.FirstName, firstName);
    localStorage.setItem(this.LastName, lastName);
    this.notifyChanges();
  }

  private notifyChanges(): void {
    this.loggedIn.next(this.hasToken());
    this.userNameSubject.next(this.getStoredUserName());
    this.roleSubject.next(this.getStoredRole());
    this.firstName.next(this.getfirstName());
    this.lastName.next(this.getlastName());
    console.log('setUserAuthenticated called', { userName: this.getStoredUserName(), role: this.getStoredRole() });
  }

  private removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userNameKey);
    localStorage.removeItem(this.roleKey);
    this.notifyChanges();
  }

  private getStoredUserName(): string {
    return localStorage.getItem(this.userNameKey) || '';
  }

  private getStoredRole(): string {
    return localStorage.getItem(this.roleKey) || '';
  }
  private getfirstName(): string {
    return localStorage.getItem(this.FirstName) || '';
  }
  private getlastName(): string {
    return localStorage.getItem(this.LastName) || '';
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getuserName(): Observable<string> {
    return this.userNameSubject.asObservable();
  }

  getRole(): Observable<string> {
    return this.roleSubject.asObservable();
  }
  getFirstName(): Observable<string> {
    return this.firstName.asObservable();
  }
  getLastName(): Observable<string> {
    return this.lastName.asObservable();
  }

}
