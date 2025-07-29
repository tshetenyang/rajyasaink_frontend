import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean = false;
  userRole: string = "";
  constructor(private authService: CommonService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.isAuthenticated().subscribe(data => {
      this.isAuthenticated = data;
      console.log('can active in auth', this.isAuthenticated);
    });
    if (!this.isAuthenticated) {
      this.router.navigate(['/']);
      console.log(" can active false")
      return false;
    }
    else {
      console.log(" can active true")
      return this.checkUserLogin(next);
    }
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    console.log("route", route)
    if (this.isAuthenticated) {
      this.authService.getRole().subscribe(transformedRole => {
        this.userRole = transformedRole;
      });
      if (route.data['role'] && route.data['role'].indexOf(this.userRole) === -1) {
        return false;
      }
      return true;
    }
    return false;
  }

}




