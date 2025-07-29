import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../mat-element';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


export interface User {
  id: number;
  fistr_name: string;
  last_name: string;
  email: string;
  role: string;
  date_joined: string;
  created_by: string;
  created_date: string;
  is_active: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'role', 'date_joined', 'created_by', 'created_date', 'is_active'];
  dataSource = new MatTableDataSource<User>();


  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(users => {
      this.dataSource.data = users
      console.log("List of user", users)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onToggleChange(event: any, user: User) {
    user.is_active = event.checked;
    this.adminService.updateUserStatus(user.id, user.is_active).subscribe(response => {
      console.log('User status updated', response);
    }, error => {
      console.error('Error updating user status', error);
      // Optionally, revert the change in the UI if the update fails
      user.is_active = !event.checked;
    });
  }
}
