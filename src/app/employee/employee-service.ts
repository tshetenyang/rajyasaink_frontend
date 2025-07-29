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
export class EmployeeService {
  private apiUrl = 'http://127.0.0.1:8000';
  UserName: any;

  constructor(private http: HttpClient, private router: Router, private authService: CommonService) { }



submitSainikData(payload: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/api/sainikdetails/sainiks/`, payload);
}
  
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
