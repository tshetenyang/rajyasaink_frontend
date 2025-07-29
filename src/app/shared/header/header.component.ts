import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../mat-element';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../shared_service/common.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterOutlet, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {


  isAuthenticated: boolean = false;
  UserName: String = '';
  Role: any = '';
  oldpassword!: string;
  newpassword1!: string;
  newpassword2!: string;
  senddata: any;
  data: any;
  unreadNotifications: any;
  FirstName!: string;
  LastName!: string;


  constructor(private authService: CommonService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuthenticateduser => {
      this.isAuthenticated = isAuthenticateduser;
    });

    this.authService.getuserName().subscribe(username => {
      this.UserName = username;
    });

    this.authService.getRole().subscribe(role => {
      this.Role = role;
      console.log('Firstname',role)
    });
    this.authService.getFirstName().subscribe(fname => {
      this.FirstName = fname;
      
    });
    this.authService.getLastName().subscribe(lname => {
      this.LastName = lname;
    });
  }

  resetPassword(oldpassword: string, newpassword1: string, newpassword2: string) {
    this.authService.resetPassword(this.oldpassword, this.newpassword1, this.newpassword1).subscribe(
      response => {
        console.log('Password changed successful:', response);
      },
      error => {
        console.error('Password change error:', error);
      }
    );
  }



  logout() {
    this.authService.logout()
    return false;
  }
}
