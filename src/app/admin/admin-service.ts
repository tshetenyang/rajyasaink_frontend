import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtInterceptor } from '../shared/shared_service/jwt.interceptor';
import { CommonService } from '../shared/shared_service/common.service';




providers: [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
]

@Injectable({
  providedIn: 'root'
})


export class AdminService {
  private apiUrl = 'http://127.0.0.1:8000';
  UserName: any;

  constructor(private http: HttpClient, private router: Router, private authService: CommonService) { }

  createuser(user: any): Observable<any> {
    this.authService.getuserName().subscribe(username => {
      this.UserName = username;
      console.log('UserName', this.UserName);
    });
    const payload = { email: user.email, password: user.password, role: user.role, created_by: this.UserName, modified_by: this.UserName, first_name: user.first_name, last_name: user.last_name };
    console.log("user", payload)
    return this.http.post<any>(`${this.apiUrl}/register `, payload).pipe(
      catchError(error => {
        console.error('Error in resetPassword:', error);
        return throwError(error);
      })
    );
  }


  getUsers(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/users `).pipe(
      map(response => response.users) // Extract the 'users' array from the response
    );
  }

  updateUserStatus(userId: number, isActive: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${userId}/status/`, { is_active: isActive });
  }

  saveDistrict(data: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/master/districts/`, data);;
  }

  saveCorps(data: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/master/corps/`, data);
  }

  saveCommissionType(data: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/master/commissions/`, data);
  }

  saveQualification(data: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/master/qualifications/`, data);
  }

  saveEsmIssuePlace(data: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/master/esm-places/`, data);
  }

  saveAwardType(data: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/master/award-types/`, data);
  }
  // Get methods
  getDistricts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/master/districts/`);
  }

  getCorps(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/master/corps/`);
  }

  getCommissionTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/master/commissions/`);
  }

  getQualifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/master/qualifications/`);
  }

  getEsmIssuePlaces(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/master/esm-places/`);
  }

  getAwardTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/master/award-types/`);
  }
}
